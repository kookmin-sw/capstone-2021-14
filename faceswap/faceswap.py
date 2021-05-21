#!/usr/bin/python

# Copyright (c) 2015 Matthew Earl
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
#     The above copyright notice and this permission notice shall be included
#     in all copies or substantial portions of the Software.
# 
#     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
#     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
#     MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
#     NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
#     DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
#     OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
#     USE OR OTHER DEALINGS IN THE SOFTWARE.

"""
This is the code behind the Switching Eds blog post:

    http://matthewearl.github.io/2015/07/28/switching-eds-with-python/

See the above for an explanation of the code below.

To run the script you'll need to install dlib (http://dlib.net) including its
Python bindings, and OpenCV. You'll also need to obtain the trained model from
sourceforge:

    http://sourceforge.net/projects/dclib/files/dlib/v18.10/shape_predictor_68_face_landmarks.dat.bz2

Unzip with `bunzip2` and change `PREDICTOR_PATH` to refer to this file. The
script is run like so:

    ./faceswap.py <head image> <face image>

If successful, a file `output.jpg` will be produced with the facial features
from `<head image>` replaced with the facial features from `<face image>`.

"""

'''
얼굴바깥쪽라인 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14 / 127, 234, 132, 172, 150, 176, 148, 152, 377, 400, 379, 397, 361, 454,356
오른쪽눈썹 15, 16, 17, 18 / 353, 293, 296, 285
왼쪽눈썹 19, 20, 21, 22 / 124, 63, 66, 55
왼쪽눈 23, 24, 25, 26, 27, 63, 64, 65, 66 / 35, 159, 133, 145, 160, 158, 153, 144 (눈 가운데인 27이 없음)
오른쪽눈 28, 29, 30, 31, 32, 67, 68, 69, 70 / 263, 386, 362, 374, 387, 385, 380, 373 (눈 가운데인 32가 없음)
콧대 33, 41, 62 / 8, 197, 1
콧볼 34, 35, 36, 42, 37, 43, 38, 39, 40 / 131, 64, 75, 20, 2, 250, 305, 294, 360
입 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61 / 
57, 40, 27, 0, 267, 270, 287, 375, 405, 17, 181, 146, 179, 15, 403, 271, 12, 41


blog상으로는 좀 달라서 다시..
얼굴바깥쪽라인 0~16 / 127, 234, 93, 58, 172, 136, 149, 148, 152, 377, 378, 365, 397, 288, 323, 454, 356
왼쪽눈썹 17~21 / 124, 63, 52, 65, 55
오른쪽눈썹 22~26 / 285, 295, 282, 293, 353
콧대 27~30 / 168, 197, 5, 1
코밑 31~35 / 60, 97, 2, 326, 290
왼쪽눈 36~41 / 33, 159, 157, 133, 153, 144
오른쪽눈 42~47 / 362, 385, 387, 263, 373, 374
입 48~61 / 61, 39, !37, 0, 267, 270, 291, 321, 314, 17, 84, 181, 62, 82, 13, 312, 292, 317, 14, 87

진행순서
1. face-detection model / faceswap model의 인풋 이미지의 크기가 어떻게 들어가느냐 ok
2. 만약 이미지의 크기를 맞췄을 때, 아웃풋으로 나오는 좌표의 값이 비슷한가 -> 어느정도 비슷하지만 같지는 않음. 얼굴선은 대충 비슷한 좌표를 찾았지만 나머지 값들은 어떻게?
3.  비슷하다면 원래 모델에서 해당 점들을 가져올 예정
4. 그 다음에 이 걸 react로 돌릴 수 있는가.

#값을 첫번째것도 가져와서 넣는다. 
--
1. js에서 faceswap.py를 돌리기 가능? ..
2. opencv를 javascript에서 사용하기

'''
import cv2
import dlib
import numpy
import sys

# PREDICTOR_PATH = "/Users/choenara/Desktop/Dev_nara/faceswap/shape_predictor_68_face_landmarks.dat"
path = '/Users/choenara/Desktop/Dev_nara/faceswap/'
SCALE_FACTOR = 1 
FEATHER_AMOUNT = 11
FACE_POINTS = list(range(17, 68))
MOUTH_POINTS = list(range(48, 61))
RIGHT_BROW_POINTS = list(range(17, 22))
LEFT_BROW_POINTS = list(range(22, 27))
RIGHT_EYE_POINTS = list(range(36, 42))
LEFT_EYE_POINTS = list(range(42, 48))
NOSE_POINTS = list(range(27, 35))
JAW_POINTS = list(range(0, 17))

# Points used to line up the images.
#눈코입라인딴부분
ALIGN_POINTS = (LEFT_BROW_POINTS + RIGHT_EYE_POINTS + LEFT_EYE_POINTS +
                               RIGHT_BROW_POINTS + NOSE_POINTS + MOUTH_POINTS)

# Points from the second image to overlay on the first. The convex hull of each
# element will be overlaid.

OVERLAY_POINTS = [
    LEFT_EYE_POINTS + RIGHT_EYE_POINTS + LEFT_BROW_POINTS + RIGHT_BROW_POINTS,
    NOSE_POINTS + MOUTH_POINTS,
]

# Amount of blur to use during colour correction, as a fraction of the
# pupillary distance.
COLOUR_CORRECT_BLUR_FRAC = 0.6

# detector = dlib.get_frontal_face_detector()
# predictor = dlib.shape_predictor(PREDICTOR_PATH)

class TooManyFaces(Exception):
    pass

class NoFaces(Exception):
    pass

# def get_landmarks(im):
#     rects = detector(im, 1)
    
#     if len(rects) > 1:
#         raise TooManyFaces
#     if len(rects) == 0:
#         raise NoFaces

#     return numpy.matrix([[p.x, p.y] for p in predictor(im, rects[0]).parts()])

def annotate_landmarks(im, landmarks):
    im = im.copy()
    for idx, point in enumerate(landmarks):
        pos = (point[0, 0], point[0, 1])
        cv2.putText(im, str(idx), pos,
                    fontFace=cv2.FONT_HERSHEY_SCRIPT_SIMPLEX,
                    fontScale=0.4,
                    color=(0, 0, 255))
        cv2.circle(im, pos, 3, color=(0, 255, 255))
    return im

def draw_convex_hull(im, points, color):
    points = cv2.convexHull(points)
    cv2.fillConvexPoly(im, points, color=color)

def get_face_mask(im, landmarks):
    im = numpy.zeros(im.shape[:2], dtype=numpy.float64)

    for group in OVERLAY_POINTS:
        draw_convex_hull(im,
                         landmarks[group],
                         color=1)

    im = numpy.array([im, im, im]).transpose((1, 2, 0))

    im = (cv2.GaussianBlur(im, (FEATHER_AMOUNT, FEATHER_AMOUNT), 0) > 0) * 1.0
    im = cv2.GaussianBlur(im, (FEATHER_AMOUNT, FEATHER_AMOUNT), 0)
    
    return im
    
def transformation_from_points(points1, points2):
    """
    Return an affine transformation [s * R | T] such that:

        sum ||s*R*p1,i + T - p2,i||^2

    is minimized.

    """
    # Solve the procrustes problem by subtracting centroids, scaling by the
    # standard deviation, and then using the SVD to calculate the rotation. See
    # the following for more details:
    #   https://en.wikipedia.org/wiki/Orthogonal_Procrustes_problem

    points1 = points1.astype(numpy.float64)
    points2 = points2.astype(numpy.float64)

    c1 = numpy.mean(points1, axis=0)
    c2 = numpy.mean(points2, axis=0)

    points1 -= c1
    points2 -= c2

    s1 = numpy.std(points1)
    s2 = numpy.std(points2)
    
    points1 /= s1
    points2 /= s2
    
    U, S, Vt = numpy.linalg.svd(points1.T * points2)

    # The R we seek is in fact the transpose of the one given by U * Vt. This
    # is because the above formulation assumes the matrix goes on the right
    # (with row vectors) where as our solution requires the matrix to be on the
    # left (with column vectors).
    R = (U * Vt).T
    
    return numpy.vstack([numpy.hstack(((s2 / s1) * R,
                                       c2.T - (s2 / s1) * R * c1.T)),
                         numpy.matrix([0., 0., 1.])])
                         
def read_im_and_landmarks1(fname):
    fname = path + fname
    im = cv2.imread(fname, cv2.IMREAD_COLOR)
    im = cv2.resize(im, dsize=(642,642)) #변경후
    f = open('/Users/choenara/Downloads/data (1).txt', 'r')
    line = f.readlines()
    b = line[0].split(',')
    a = []
    for i in range(0, len(b), 2):
        a.append([int(b[i]), int(b[i+1])])
    np_a = numpy.matrix(a)
    # im = cv2.resize(im, (im.shape[1] * SCALE_FACTOR, im.shape[0] * SCALE_FACTOR))
    # s = get_landmarks(im)
    f.close()
    return im, np_a

def read_im_and_landmarks2(fname):
    fname = path + fname 
    im = cv2.imread(fname, cv2.IMREAD_COLOR)
    #im = cv2.resize(im, (im.shape[1] * SCALE_FACTOR, im.shape[0] * SCALE_FACTOR))
    im = cv2.resize(im, dsize=(642,642)) #변경후
    f = open('/Users/choenara/Downloads/data.txt', 'r')
    line = f.readlines()
    b = line[0].split(',')
    a = []
    for i in range(0, len(b), 2):
        a.append([int(b[i]), int(b[i+1])])
    np_a = numpy.matrix(a)
    # im = cv2.resize(im, (im.shape[1] * SCALE_FACTOR, im.shape[0] * SCALE_FACTOR))
    # s = get_landmarks(im)
    f.close()
    return im, np_a



def warp_im(im, M, dshape):
    output_im = numpy.zeros(dshape, dtype=im.dtype)
    cv2.warpAffine(im,
                   M[:2],
                   (dshape[1], dshape[0]),
                   dst=output_im,
                   borderMode=cv2.BORDER_TRANSPARENT,
                   flags=cv2.WARP_INVERSE_MAP)
    return output_im

def correct_colours(im1, im2, landmarks1):
    blur_amount = COLOUR_CORRECT_BLUR_FRAC * numpy.linalg.norm(
                              numpy.mean(landmarks1[LEFT_EYE_POINTS], axis=0) -
                              numpy.mean(landmarks1[RIGHT_EYE_POINTS], axis=0))
    blur_amount = int(blur_amount)
    if blur_amount % 2 == 0:
        blur_amount += 1
    im1_blur = cv2.GaussianBlur(im1, (blur_amount, blur_amount), 0)
    im2_blur = cv2.GaussianBlur(im2, (blur_amount, blur_amount), 0)

    # Avoid divide-by-zero errors.
    im2_blur += (128 * (im2_blur <= 1.0)).astype(im2_blur.dtype)

    return (im2.astype(numpy.float64) * im1_blur.astype(numpy.float64) /
                                                im2_blur.astype(numpy.float64))

im1, landmarks1 = read_im_and_landmarks1(sys.argv[1])
im2, landmarks2 = read_im_and_landmarks2(sys.argv[2])
M = transformation_from_points(landmarks1[ALIGN_POINTS],
                               landmarks2[ALIGN_POINTS])

mask = get_face_mask(im2, landmarks2)
# print(mask)
# for i in range(len(mask)):
#     for j in range(len(mask[i])):
#         if mask[i][j] > 0:
#             print(1)
# # cv2.imshow('mask', mask)
# cv2.waitKey(0)
# cv2.destroyAllWindows()

warped_mask = warp_im(mask, M, im1.shape)
combined_mask = numpy.max([get_face_mask(im1, landmarks1), warped_mask],
                          axis=0)
warped_im2 = warp_im(im2, M, im1.shape)
warped_corrected_im2 = correct_colours(im1, warped_im2, landmarks1)

output_im = im1 * (1.0 - combined_mask) + warped_corrected_im2 * combined_mask
cv2.imwrite(path+'output.jpg', output_im)