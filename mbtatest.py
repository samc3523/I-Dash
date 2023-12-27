import requests as r 

stop = "place-grigg"
url = f"https://api-v3.mbta.com/predictions?filter[stop]={stop}"

headers = {'x-api-key': '4529b349a9714c47a0751c1bf2928d41'}

res = r.get(url,headers=headers)

print(res.text)