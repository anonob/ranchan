#Short script for scraping the currently hosted banner images from 4chan
#
#Note that this script also converts jpg's, jpeg's, and png's to jpg's and compresses them
#
#The banner images can be found at: http://s.4cdn.org/image/title/<int>.<extn>
#where <int> is an integer >= 0, and <extn> can be any valid image extension, though
#they seem to primarily use jpg's, png's, and gif's

import sys
import requests
import urllib
from PIL import Image

#This represents an estimate for the largest number of image files for each type
maxImg = 500
base = "http://s.4cdn.org/image/title/"
extns = [".jpg", ".jpeg", ".png", ".gif"]
count = 0
rootPath = ""

#Make sure a path to where the images should be saved is specified
if len(sys.argv) != 2:
	print "Usage: [user@computer]$ python 4chan-banner-scraper.py path-to-image-folder"
else:
	rootPath = str(sys.argv[1])

#Small bit of sanitizing for forgetting the trailing "/"
if(rootPath[len(rootPath) - 1] != "/"):
	rootPath = rootPath + "/";

#Process jpg's, jpeg's, and png's, compressing their size to 80% original quality
for i in range(0, 3):
	for j in range(0, maxImg):
		urlPath = base + str(j) + extns[i]
		r = requests.get(urlPath)
		#Since there are some images in the sequence that don't exist anymore, check HTTP response
		if r.status_code == 200:
			#For my purposes, it was important to convert/compress static images to .jpg
			fn = rootPath + str(count) + ".jpg";
			urllib.urlretrieve(urlPath, fn)
			img = Image.open(fn).convert("RGB").save(fn, optimize=True, quality=80)
			count += 1
	print "Finished processing " + extns[i] + "'s!"
count = 0

#Process gif's, retaining their original quality
for i in range(3, 4):
	for j in range(0, maxImg):
		urlPath = base + str(j) + extns[i]
		r = requests.get(urlPath)
		if r.status_code == 200:
			fn = rootPath + str(count) + extns[i];
			urllib.urlretrieve(urlPath, fn)
			count += 1
	print "Finished processing " + extns[i] + "'s!"