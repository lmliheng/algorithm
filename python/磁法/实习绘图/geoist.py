import matplotlib.pyplot as plt
from pathlib import Path
from geoist import DATA_PATH 
from geoist.others.gdal import GDALGrid
from geoist.others.utils import map2DGrid


filename1 = Path(DATA_PATH, 'data/magnetic_data.grd')
gd1, ff = GDALGrid.getFileGeoDict(filename1)
