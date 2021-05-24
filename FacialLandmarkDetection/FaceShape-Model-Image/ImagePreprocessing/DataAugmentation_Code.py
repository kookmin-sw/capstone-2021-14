from numpy import expand_dims
from keras.preprocessing import image
from keras.preprocessing.image import load_img
from keras.preprocessing.image import save_img
from keras.preprocessing.image import img_to_array
from keras.preprocessing.image import ImageDataGenerator
from matplotlib import pyplot as plt
from sklearn.model_selection import train_test_split
import numpy as np


path = '/content/drive/MyDrive/ShapeImage/Egg'

generator = ImageDataGenerator(
    brightness_range=[0.7, 1.0],
    rotation_range = 5,
    horizontal_flip=True,
    width_shift_range=0.07,
    height_shift_range=0.07,
    shear_range = 0.2,
  )

# 데이터 추출
e_index = 3185
e_i = 0
escapeVar = False
while True:
  if escapeVar:
    break
  try:
    while True:
      if e_index > 27390:
        escapeVar = True
        break
      if e_index < 10000:
          Img_Egg = load_img('/content/drive/MyDrive/ShapeImage/Egg/0{0}.png'.format(e_index))
      else:
          Img_Egg = load_img('/content/drive/MyDrive/ShapeImage/Egg/{0}.png'.format(e_index))
      egg_data = img_to_array(Img_Egg)
      samples = expand_dims(egg_data, 0)

      # 10장씩 추출
      i = 0
      for batch in generator.flow(samples, batch_size=1, save_to_dir='/content/drive/MyDrive/SavedImage/Egg', save_prefix='Egg', save_format='png'):
        print("here")
        i += 1
        if i > 10:
            break
      # choose next image
      e_index += 1
  except:
    print("There's no such file name!")
    e_index += 1