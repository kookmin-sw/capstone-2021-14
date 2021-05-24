import tensorflow as tf
keras = tf.keras
import os
import glob
import h5py
from PIL import Image
from PIL import ImageFile
from keras.models import Sequential, Model
from keras.applications.mobilenet_v2 import MobileNetV2
from keras.applications.vgg16 import VGG16, preprocess_input
from keras.preprocessing.image import ImageDataGenerator,load_img, img_to_array
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Dense, Dropout, Input, Flatten, SeparableConv2D
from keras.layers import GlobalMaxPooling2D
from keras.layers.normalization import BatchNormalization
from keras.models import Model
from keras.optimizers import Adam, SGD, RMSprop
from keras.callbacks import ModelCheckpoint, Callback, EarlyStopping
from keras.utils import to_categorical
from keras import backend as K
import numpy as np

batch_size = 16
train_images = '/content/drive/MyDrive/Dataset/training_set'
test_images = '/content/drive/MyDrive/Dataset/test_set'

# Data Augmentation
TrainDatagenerator = ImageDataGenerator(
        #preprocessing_function = preprocess_input,
        rescale=1./255,
        horizontal_flip=True,
)

TestDatagenerator = ImageDataGenerator(
    rescale=1./255
    #preprocessing_function = preprocess_input
)

# 지정한 path에서 train set load
train_data = TrainDatagenerator.flow_from_directory(
    train_images,
    target_size = (160,160),
    batch_size = batch_size,
    class_mode = 'categorical'

)

# 지정한 path에서 test set load
test_data = TestDatagenerator.flow_from_directory(
    test_images,
    target_size = (160,160),
    batch_size = batch_size,
    class_mode = 'categorical'
)

IMG_SIZE = 160 # 모든 이미지는 160x160으로 크기가 조정됩니다

IMG_SHAPE = (IMG_SIZE, IMG_SIZE, 3)

# 사전 훈련된 모델 MobileNet V2에서 기본 모델을 생성합니다.
base_model = MobileNetV2(input_shape=IMG_SHAPE,
                         include_top=False,
                         weights='imagenet')

base_model.trainable = False
base_model.summary()

#flatten = keras.layers.Flatten()
global_average_layer = keras.layers.GlobalAveragePooling2D()
layer1 = keras.layers.Dense(1280, activation='relu')
#dropout1 = keras.layers.Dropout(0.7)
layer2 = keras.layers.Dense(1280, activation='relu')
layer3 = keras.layers.Dense(640, activation='relu')
#dropout2 = keras.layers.Dropout(0.5)
output_layer = keras.layers.Dense(4, activation='softmax')

model = keras.Sequential([
  base_model,
  #flatten,
  global_average_layer,
  layer1,
  #dropout1,
  layer2,
  layer3,
  #dropout2,
  output_layer,
])

base_learning_rate = 0.00002
es = EarlyStopping(patience=5,min_delta= .05, monitor="val_accuracy")
chkpt = ModelCheckpoint(filepath='best_model.h5', save_best_only=True, save_weights_only=True)
model.compile(optimizer=Adam(lr=base_learning_rate),
              loss='categorical_crossentropy',
              metrics=['accuracy'])

ImageFile.LOAD_TRUNCATED_IMAGES = True

history = model.fit_generator(
    train_data,
    steps_per_epoch = train_data.samples//batch_size,
    validation_data = test_data,
    validation_steps = test_data.samples//batch_size,
    epochs = 50,
    callbacks=[es,chkpt]
)

acc = history.history['accuracy']
val_acc = history.history['val_accuracy']

loss = history.history['loss']
val_loss = history.history['val_loss']

import matplotlib.pyplot as plt


epochs = range(len(acc))
plt.plot(epochs,acc,'bo',label='Training acc')
plt.plot(epochs,val_acc,'r',label='Validation acc')
plt.legend()


plt.figure()
plt.plot(epochs,loss,'bo',label='Training loss')
plt.plot(epochs,val_loss,'r',label='Validation loss')

plt.legend()
plt.show()