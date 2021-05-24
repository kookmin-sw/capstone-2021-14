import tensorflow as tf
keras = tf.keras
import os
import glob
import h5py
from PIL import Image
from keras import initializers, regularizers
from keras.models import Sequential, Model
from keras.applications import InceptionV3
from keras.preprocessing.image import ImageDataGenerator,load_img, img_to_array
from keras.layers import Conv2D, MaxPooling2D, Dense, Dropout, Input, Flatten
from keras.layers import GlobalMaxPooling2D, GlobalAveragePooling2D
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
        rescale=1./255,
        horizontal_flip=True
)

TestDatagenerator = ImageDataGenerator(
    rescale=1./255
)

# 지정한 path에서 train set load
train_data = TrainDatagenerator.flow_from_directory(
    train_images,
    target_size = (224, 224),
    batch_size = batch_size,
    class_mode = 'categorical'

)

# 지정한 path에서 test set load
test_data = TestDatagenerator.flow_from_directory(
    test_images,
    target_size = (224, 224),
    batch_size = batch_size,
    class_mode = 'categorical'
)


IMG_SIZE = 224 # 모든 이미지는 224x224으로 크기가 조정

IMG_SHAPE = (IMG_SIZE, IMG_SIZE, 3)

# 사전 훈련된 모델 VGG16에서 기본 모델을 생성합니다.
base_model = InceptionV3(input_shape=IMG_SHAPE, include_top=False, weights='imagenet')

# 가중치를 고정할지 고정하지 말지 설정
# base_model.trainable = False

# 모델의 신경망 구조를 확인
# base_model.summary()

# base_model에 마지막 layer에 추가한 layer들
# flatten = Flatten() -> 사용 시 파라미터 증가로 성능이 저하
globalavgpool = GlobalAveragePooling2D()
layer1 = Dense(1024, activation='relu')
dropout1 = Dropout(0.7)
layer2 = Dense(512, activation='relu')
dropout2 = Dropout(0.6)
layer3 = Dense(256, activation='relu')
output_layer = Dense(4, activation='softmax')

# 전체 모델 구성 - fc layer와 dropout을 변경하면서 진행
model = Sequential([
    base_model,
    #flatten,
    globalavgpool,
    layer1,
    #dropout1,
    #layer2,
    dropout2,
    layer3,
    output_layer
])

# model.summary() - 총 2400만개의 파라미터 생성

opt = SGD(lr=0.001, momentum=0.9)
# Earily Stop
es = EarlyStopping(patience=20, mode='min', monitor="val_loss")
# Checkpoint 설정 - 최적의 Acurracy를 갖는 가중치 저장
chkpt = ModelCheckpoint(filepath='inceptionv3_model_size299.h5', save_best_only=True, save_weights_only=False)
# 다중 클래스 -  loss function: categorical_crossentropy
model.compile(loss='categorical_crossentropy', metrics=['accuracy'], optimizer=opt)

# Fit the model
# callback 설정 - Checkpoint 사용
# 학습을 진행하면서 동시에 validation set으로 성능 검증
from PIL import ImageFile

ImageFile.LOAD_TRUNCATED_IMAGES = True

history = model.fit_generator(
    train_data,
    steps_per_epoch = train_data.samples//batch_size,
    validation_data = test_data,
    validation_steps = test_data.samples//batch_size,
    epochs = 300,
    callbacks=[chkpt]
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
