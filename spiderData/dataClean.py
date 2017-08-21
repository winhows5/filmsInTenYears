import os
import pandas as pd
import json

# files = []
# lines = 0
# for y in range(2008, 2018):
#     if os.path.exists('film' + str(y) + '.csv'):
#         files.append(pd.read_csv('film' + str(y) + '.csv'))
#         lines += len(pd.read_csv('film' + str(y) + '.csv'))
# file = pd.concat(files)
#
# file.to_csv('film.csv', index=False)

file = pd.read_csv('film.csv')
datebox = file['排期']
price = file['票价']
box = file['票房']
loc = file['地区']
cate = file['类型']
name = file['片名']

def datePos(item):
    ''' process negative date '''

    if int(item[1][2]) > 0:
        return item
    elif int(item[2][2]) > 0:
        item[2][1] = int(item[2][1]) + int(item[1][1])
        item.pop(1)
        return item
    else:
        item[3][1] = int(item[3][1]) + int(item[2][1]) + int(item[1][1])
        item.pop(2)
        item.pop(1)
        return item

i = 0
data = {}
for n, c, l, b, p, item in zip(name, cate, loc, box, price, datebox):
    item = item.replace('[[', '').replace(']]', '').replace('\'', '')
    item = item.split('], [')
    item = [x.split(', ') for x in item]
    item = datePos(item)
    i += 1
    s = sum([int(x[1]) for x in item])
    # 检测到以下数据出现错误并更正
    # 功夫熊猫,木乃伊3：龙帝之墓,通缉令,国家宝藏：夺宝秘笈,尼斯湖怪·深水传说,世界末日,七龙珠,谍影重重4

    m = (1 + abs((s-b)/s))
    item = [[x[0], int(m*int(x[1])), int(x[2])] for x in item]
    data[i] = {
        '片名': n,
        '类型': c,
        '地区': l,
        '票房': b,
        '票价': p,
        '排期': item
    }
print(data)

