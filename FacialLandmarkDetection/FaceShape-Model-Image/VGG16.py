import tensorflow as tf
keras = tf.keras
import os
import glob
import h5py
from PIL import Image
from PIL import ImageFile
from keras.models import Sequential, Model
from keras.applications.vgg16 import VGG16, preprocess_input
from keras.preprocessing.image import ImageDataGenerator,load_img, img_to_array
from keras.layers import Conv2D, MaxPooling2D, Dense, Dropout, Input, Flatten, SeparableConv2D
from keras.layers import GlobalMaxPooling2D
from keras.layers.normalization import BatchNormalization
from keras.optimizers import Adam, SGD, RMSprop
from keras.callbacks import ModelCheckpoint, Callback, EarlyStopping
from keras.utils import to_categorical
from keras import backend as K
import numpy as np

batch_size = 16
train_images = '../Dataset/training_set'
test_images = '../Dataset/test_set'

# Data Augmentation
TrainDatagenerator = ImageDataGenerator(
        rescale=1.0/255.0,
        width_shift_range=0.1,
        height_shift_range=0.1,
        shear_range = 0.2,
        horizontal_flip=True,
)

TestDatagenerator = ImageDataGenerator(
    rescale=1.0/255.0,
    fill_mode='nearest'
    #preprocessing_function = preprocess_input,
)

# 지정한 path에서 train set load
train_data = TrainDatagenerator.flow_from_directory(
    train_images,
    target_size = (224,224),
    batch_size = batch_size,
    class_mode = 'categorical'
)

# 지정한 path에서 test set load
test_data = TestDatagenerator.flow_from_directory(
    test_images,
    target_size = (224,224),
    batch_size = batch_size,
    class_mode = 'categorical'
)

IMG_SIZE = 224 # 모든 이미지는 224x224으로 크기가 조정됩니다

IMG_SHAPE = (IMG_SIZE, IMG_SIZE, 3)

# 사전 훈련된 모델 VGG16에서 기본 모델을 생성합니다.
base_model = VGG16(input_shape=IMG_SHAPE, include_top=False, weights='imagenet')

base_model.trainable = False
base_model.summary()

flatten = Flatten()
#global_average_layer = GlobalAveragePooling2D()
layer1 = Dense(4096, activation='relu')
dropout1 = Dropout(0.5)
layer2 = Dense(2048, activation='relu')
dropout2 = Dropout(0.3)
layer3 = Dense(1024, activation='relu')
output_layer = Dense(4, activation='softmax')

model = Sequential([
  base_model,
  #global_average_layer,
  flatten,
  layer1,
  layer2,
  layer3,
  output_layer,
])

#model.summary() # 파라미터 증가

#opt = Adam(lr=0.0001, decay=1e-5)
opt = RMSprop(lr=0.00002)
# Earily Stop  -
es = EarlyStopping(patience=5,min_delta= .05, monitor="val_accuracy")
# Checkpoint 설정 - 최적의 Acurracy를 갖는 가중치 저장
chkpt = ModelCheckpoint(filepath='best_model', save_best_only=True, save_weights_only=True)
# 다중 클래스 -  loss function: categorical_crossentropy
model.compile(loss='categorical_crossentropy', metrics=['accuracy'], optimizer=opt)

# Fit the model
# callback 설정 - Checkpoint 사용
# 학습을 진행하면서 동시에 validation set으로 성능 검증
ImageFile.LOAD_TRUNCATED_IMAGES = True
history = model.fit_generator(
    train_data,
    steps_per_epoch = train_data.samples//batch_size,
    validation_data = test_data,
    validation_steps = test_data.samples//batch_size,
    epochs = 100,
    callbacks=[chkpt]
)

acc = history.history['accuracy']
val_acc = history.history['val_accuracy']

loss = history.history['loss']
val_loss = history.history['val_loss']

from matplotlib import pyplot as plt

epochs = range(len(acc))
plt.plot(epochs,acc,'bo',label='Training acc')
plt.plot(epochs,val_acc,'r',label='Validation acc')
plt.legend()


plt.figure()
plt.plot(epochs,loss,'bo',label='Training loss')
plt.plot(epochs,val_loss,'r',label='Validation loss')

plt.legend()
plt.show()