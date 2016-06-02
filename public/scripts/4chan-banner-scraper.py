import requests
import urllib

base = "http://s.4cdn.org/image/title/"
extns = [".gif"]
count = 0

for i in range(0, 1):
    for j in range(0, 10001):
        r = requests.get(base + str(j) + extns[i])
        if r.status_code == 200:
            urllib.urlretrieve(base + str(j) + extns[i], "title-img-" + str(count) + extns[i])
            urllib.urlretrieve(base + str(j) + extns[i], str(j) + extns[i])
            count += 1
        if j%1000 == 0:
            print j
    count = 0
