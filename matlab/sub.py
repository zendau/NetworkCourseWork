import sys, os
import json
import scipy.io as sio
import numpy as np

try:
    # Чтение данных из файла matlab
    matlabData = sio.loadmat(sys.argv[1])
    # Получение массива с данными и его округление
    around = np.around(matlabData['ans'], 1)
    # Вывод массива в формате json
    print(json.dumps(around.tolist()))
except Exception as e:
    # Вывод ошибки
    print(e)

