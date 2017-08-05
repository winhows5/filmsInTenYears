import re
import requests
import time
import random
import chardet
from bs4 import BeautifulSoup
from itertools import islice
import pandas as pd

print(chardet.detect(requests.get('http://www.cbooo.cn/').content)['encoding'])
# encoding = utf-8


headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) '
                  'AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'zh-cn',
    'Upgrade-Insecure-Requests': '1',
    'DNT': '1'

}


def setCookie():
    cookie = {'Cookie':	'bdshare_firstime=1501828241985; '
                        'Hm_lpvt_daabace29afa1e8193c0e3000d391562=%s; '
                        'Hm_lvt_daabace29afa1e8193c0e3000d391562=1501549979,1501638789,1501722154,1501827928'
                        % int(time.time())
              }
    return cookie

def getToplist():
    film_list = []
    url = 'http://www.cbooo.cn/'
    s = requests.session()

    for y in range(2008, 2018):

        print('年份进度：', y)
        time.sleep(0.745 * random.random())
        url_top = url + 'year?year=' + str(y)
        headers['Referer'] = url_top
        requests.utils.add_dict_to_cookiejar(s.cookies, setCookie())
        response = s.get(url_top, headers=headers)
        print(response.status_code, ':', url_top)

        soup = BeautifulSoup(response.text, 'html.parser')
        films = soup.find('table', attrs={'id': 'tbContent'}).find_all('tr')
        for items in islice(films, 1, None):
            flink = items.find('a')['href']
            fwdate = getDetails(flink, s)
            fname = items.find('p').text
            ftype = items.find('td').find_next_sibling()
            fbox = ftype.find_next_sibling()
            fprice = fbox.find_next_sibling()
            floc = fprice.find_next_sibling().find_next_sibling()
            fdate = floc.find_next_sibling()
            print('Done:', fname)
            film_dt = {
                '片名': re.sub('\d{1,2}\.', '', fname),
                '类型': ftype.text,
                '票房': fbox.text,
                '票价': fprice.text,
                '地区': floc.text,
                # '日期': fdate.text,
                # '排期': fwdate
            }
            if fdate.text == '':
                continue
            fwdate.append([fdate.text, 0, 0])
            fwdate = fwdate[::-1]
            film_dt['排期'] = fwdate
            film_list.append(film_dt)

        df = pd.DataFrame(film_list)
        df.to_csv('film%s.csv' % y, columns=['片名', '类型', '地区', '票房', '票价', '排期'], index=False)
        film_list =[]
    # with open('film.csv', 'w') as f:



def getDetails(url=None, s=None):

    fwdate = []
    time.sleep(0.787 * random.random())

    requests.utils.add_dict_to_cookiejar(s.cookies, setCookie())
    res = s.get(url, headers=headers)
    print(res.status_code, ':', url)
    soup_dt = BeautifulSoup(res.text, 'html.parser')
    while soup_dt.find('title').text == '网站防火墙':
        res = s.get(url, headers=headers)
        print('Retry', ':', url)
        soup_dt = BeautifulSoup(res.text, 'html.parser')
    try:
        films_dt = soup_dt.find('table', {'class': 'datebg datebg01 datebg03'}).find_all('tr')
    except AttributeError:
        print(url)
        return []
    for items in islice(films_dt, 1, None):
        date = items.find('td').text
        date = re.sub('\s*', '', date)
        date = re.sub('第\d{1,2}周', '', date)
        date = re.sub('[^-]{6}-', '', date)
        date = re.sub('[^\x00-\xff]', '-', date)
        try:
            box = items.find('td', attrs={'class': 'last'}).find_previous_sibling().find_previous_sibling().text
        except AttributeError:
            box = items.find('td', attrs={'class': 'lasta'}).find_previous_sibling().find_previous_sibling().text
        try:
            days = items.find('td', attrs={'class': 'last'}).text
        except AttributeError:
            days = items.find('td', attrs={'class': 'lasta'}).text
        fwdate.append([str(date)[:-1], int(box), int(days)])

    return fwdate

if __name__ == '__main__':
    getToplist()
