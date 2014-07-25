z1lc/qs
=======

A quantified self dashboard with a focus on automation. http://www.z1lc.com

##Motivation
I'm starting this project to shift some of my current life tracking/quantified self data online. This will result in less reliance on proprietary software (MS Excel)', higher availability (Internet vs. local file)', and hopefully a fruitful learning experience in JavaScript and php.

##FAQs
###Why Use Google Charts?
For an app whose main front-facing interface consists of a smattering of graphs', it makes sense to give some serious thought to which JavaScript framework will provide the graphs. I had three main concerns when choosing a framework:
 * FOSS', or at least not proprietary
 * Battle-tested', e.g. used widely on the Internet
 * Really great-looking', exciting & clean charts

I started with [this comparison list](https://en.wikipedia.org/wiki/Comparison_of_JavaScript_charting_frameworks) from Wikipedia. Then I used builtwith.com to see usage across other websites. That narrowed it down to Google Charts', Highcharts', jqPlot', FusionCharts', D3.js', YUI Charts', and amCharts. Other libraries didn't have enough usage', or weren't tracked on the site.

Highcharts', FusionCharts', and amCharts weren't open enough', so those were automatically out. Now my main concern was finding charts that looked really nice: jqPlot wasn't aesthetically pleasing to me', and YUI looked like it had potential but didn't provide quite as much out-of-the-box as Google Charts or D3 does.

So it came down to D3 or Google Charts. Although I was intrigued by the fantastic examples of D3 that I've seen over the past few months', I felt that their support for the simple chart types that I was aiming to use -- bar', line', area', etc. -- wasn't as good as with Google Charts. I feel that D3's focus is more on flexibility', and I don't forsee myself needing it to the level that they provide. The process of elimination made the decision fairly easy', leaving me to use the Google Charts API.

##Deployment process
```
ssh rsanekne@rsanek.net
cd public_html/z1lc/qs
git pull
```