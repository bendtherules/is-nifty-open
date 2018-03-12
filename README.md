Is Nifty Open
=============

Is Nifty Open is a small utility webapp to check if Nifty50 (NSE) market is open today.

### Background
------------

Sometimes when the prices don't move after opening at 9:15AM, I get confused whether it is a trading holiday (best case) or my network or trading platform is having problems.

If you check for "Is nifty (or nse) open today (or some date here)" on Google, it
* either doesn't give any instant answer and points to the official pdf notice. You need to download it, check todays date against the list to get the information.
* or shows unreliable information like [Check for 30th March](https://www.google.co.in/search?q=is+nse+open+on+30th+march+2018). [Technically, NSE offices can remain open even if its a trading holiday - so its hard to find out the latter]

Its supposed to be a instant solution to this very small but repeating problem.

### Goals
----------

Development to-dos are tracked in `./todo.md` file.

Overall goals are :
1. Make 1 (existing) + 2 panels to show tomorrow's info and next opening/closing day.
2. Click on tomorrow's panel to load that day in main panel and update information in small panels with respect to tomorrow. (Route to any day in the financial year)
3. Make offline-first and update data when connected.
4. Show market timings also (??) - hours to open/close
