import os
import pandas as pd

files = []
lines = 0
for y in range(2008, 2018):
    if os.path.exists('film' + str(y) + '.csv'):
        files.append(pd.read_csv('film' + str(y) + '.csv'))
        lines += len(pd.read_csv('film' + str(y) + '.csv'))
file = pd.concat(files)
file.to_csv('film.csv', index=False)
# print(lines)
# line: 247