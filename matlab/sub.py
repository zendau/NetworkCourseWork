import sys, os
import json
import scipy.io as sio
import numpy as np


try:
    matlabData = sio.loadmat(sys.argv[1])
    around = np.around(matlabData['ans'], 1)
    print(json.dumps(around.tolist()))
except Exception as e:
    print(e)

