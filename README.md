# Films in Ten Years / 观影十年

### Data visualization (2017/08/21)

### Data clean (2017/08/20)
Actually the data cleaning process was amostly done in the _Data source_ section, still there are several things to deal with:
- the release days are negative before the release date, and those items should be eliminated while their box offices added to the next item.
- the countries of film are in chaos, therefore the nationality are determined according to the production company and director.

### Data source (2017/08/18)
- __main data__: [中国票房](http://www.cbooo.cn/year)<br>
Crawl data of top 25 films in box office every year from 2008 to 2017, including film names, categories, countries, box offices, ticket prices and dates.
- __contrasting data__: [Mtimes(时光网)](http://movie.mtime.com)<br>
In order to ensure the data is reliable, the total box office of every film is contrasted between [中国票房](http://www.cbooo.cn/year) and [Mtimes](http://movie.mtime.com). If the difference is more than 8%, the box data should be compared manually with the third site ([IMDb](http://www.boxofficemojo.com/movies) for example).<br>
The disadvantage of Mtimes: There is no weekly box offices data.
- __corrected data__: [IMDb](http://www.boxofficemojo.com/movies)<br>
In some cases, especially foreign films, the weekly data is dismissed. The [IMDb](http://www.boxofficemojo.com/movies) data about the films is used to correct when this happens.<br>
The disadvantage of IMDb: Some of the China films data is dismissed.
