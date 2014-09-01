z1lc/qs
=======

A quantified-self dashboard with a focus on automated data gathering. http://www.z1lc.com

##Motivation
I'm starting this project to shift some of my current life tracking/quantified self data online. This will result in 
less reliance on proprietary software (MS Excel), higher availability (Internet vs. local file), 
and hopefully a fruitful learning experience in JavaScript and php.

##Architecture Overview
What follows is a brief summary of the server-side and client-side architecture for storing data. This is mainly here
 for my own reference.

###Database Schema & Storage
All categories of tracking are stored in the 'dimensions' table. This table gives each category name an ID and 
specifies in which table its data is stored. For most categories, this will be the 'simple_value' table. In 
'simple_value', all we store is the value we want to track, the id of the dimension that it belongs to, 
and a datetime value that is the UTC timestamp. Localization for time zones and things like DST is to be done later, 
either by server-side or even client-side code, so that we don't have problems with logging time. This also 
necessitates a separate table that specifies the individual time zones a person finds themselves in, 
but this is yet to be implemented.

Other categories that are more difficult to store in a 'simple_value'-type table have their own tables. Sleep and 
todo are fairly self-explanatory. For email, I am using the GMail API to get individual message IDs and log when I 
received the message versus when it was archived. Code that accesses this will then have to make calculations for the
response time. Work is a bit trickier, but not intensely so. I am integrating with Toggl in order to simplify my 
time tracking. the 'work' table will contain start and end times for individual instances of tasks, 
along with a work_category_id foreign key that refers to the work_category table. 
 
###Client-Side Models
I am using [Backbone.js](http://backbonejs.org/) as my MVC framework of choice, 
and generally aim to mimic the database when representing data in Models. Consequently, 
all data that resides in the 'simple_values' table also uses the same model, a 'SimpleValueModel'. This model 
includes properties like dimension name, id, and the actual data that is within the database. Since I don't really 
have that much data

##FAQs
###Why Use Google Charts?
For an app whose main front-facing interface consists of a smattering of graphs, it makes sense to give some serious 
thought to which JavaScript framework will provide the graphs. I had three main concerns when choosing a framework:
 * FOSS, or at least not proprietary
 * Battle-tested, e.g. used widely on the Internet
 * Really great-looking, exciting & clean charts

I started with [this comparison list](https://en.wikipedia.org/wiki/Comparison_of_JavaScript_charting_frameworks) 
from Wikipedia. Then I used builtwith.com to see usage across other websites. That narrowed it down to Google Charts,
Highcharts, jqPlot, FusionCharts, D3.js, YUI Charts, and amCharts. Other libraries didn't have enough usage, 
or weren't tracked on the site.

Highcharts, FusionCharts, and amCharts weren't open enough, so those were automatically out. Now my main concern was
finding charts that looked really nice: jqPlot wasn't aesthetically pleasing to me, 
and YUI looked like it had potential but didn't provide quite as much out-of-the-box as Google Charts or D3 does.

So it came down to D3 or Google Charts. Although I was intrigued by the fantastic examples of D3 that I've seen over
the past few months, I felt that their support for the simple chart types that I was aiming to use -- bar, line, 
area, etc. -- wasn't as good as with Google Charts. I feel that D3's focus is more on flexibility, 
and I don't forsee myself needing it to the level that they provide. The process of elimination made the decision 
fairly easy, leaving me to use the Google Charts API.

##Deployment process
```
ssh rsanekne@rsanek.net
cd public_html/z1lc/qs
git pull
```

##Credit
Favicon [designed by Freepik.com](http://www.freepik.com).