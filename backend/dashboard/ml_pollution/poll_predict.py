import pickle
import pandas as pd

# from dashboard.tables.ml_data import MlData

def mypredict(coord=["53.28636194", "-6.165993889"]):
    """
    predicts pollution data
    """
    lat=float(coord[0])
    long=float(coord[1])
    filename = 'dashboard/ml_pollution/pollution_prediction_correct.pkl'
    model = pickle.load(open(filename, 'rb'))
    test = [[lat, long]]
    predict = round(model.predict(test)[0], 5)
    # mymod = MlData(latitude=lat, longitude=long, pollution=predict)
    return lat, long, predict


def random_coord(l=20):
    """
    selects random coordinates
    """
    lat_dir = 'dashboard/ml_pollution/lat.txt'
    long_dir = 'dashboard/ml_pollution/long.txt'
    with open(lat_dir, 'r') as file_handle:
        lati = file_handle.readlines()
    with open(long_dir, 'r') as file_handle:
        longi = file_handle.readlines()
    for i in range(len(lati)):
        lati[i] = lati[i][:-1]
        longi[i] = longi[i][:-1]
    lati = pd.Series(lati)
    longi = pd.Series(longi)
    coord_dat = pd.concat([lati, longi], axis=1, ignore_index=True)
    sample = coord_dat.sample(l)
    sample = sample.reset_index(drop=True)
    return sample


# a,b,c=mypredict();
# print(a)
# print(b)
# print(c)
