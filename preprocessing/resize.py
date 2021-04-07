import cv2

idx = 1

while(idx < 70000):
    if (idx < 10):
        name = '0000{}'.format(idx)
        image = cv2.imread("thumbnails128x128\{}.png".format(name), cv2.IMREAD_COLOR)
        dst = cv2.resize(image, dsize=(640, 640), interpolation=cv2.INTER_AREA)
        cv2.imwrite("picture\\0000{}.png".format(idx), dst)
        idx += 1
    elif (idx < 100):
        name = '000{}'.format(idx)
        image = cv2.imread("thumbnails128x128\{}.png".format(name), cv2.IMREAD_COLOR)
        dst = cv2.resize(image, dsize=(640, 640), interpolation=cv2.INTER_AREA)
        cv2.imwrite("picture\\000{}.png".format(idx), dst)
        idx += 1
    elif (idx < 1000):
        name = '00{}'.format(idx)
        image = cv2.imread("thumbnails128x128\{}.png".format(name), cv2.IMREAD_COLOR)
        dst = cv2.resize(image, dsize=(640, 640), interpolation=cv2.INTER_AREA)
        cv2.imwrite("picture\\00{}.png".format(idx), dst)
        idx += 1
    elif (idx < 10000):
        name = '0{}'.format(idx)
        image = cv2.imread("thumbnails128x128\{}.png".format(name), cv2.IMREAD_COLOR)
        dst = cv2.resize(image, dsize=(640, 640), interpolation=cv2.INTER_AREA)
        cv2.imwrite("picture\\0{}.png".format(idx), dst)
        idx += 1
    else:
        name = '{}'.format(idx)
        image = cv2.imread("thumbnails128x128\{}.png".format(name), cv2.IMREAD_COLOR)
        dst = cv2.resize(image, dsize=(640, 640), interpolation=cv2.INTER_AREA)
        cv2.imwrite("picture\\{}.png".format(idx), dst)
        idx += 1