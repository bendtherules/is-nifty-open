Is Nifty Open
=============

Is Nifty Open is a small utility webapp to check if Nifty50 (NSE) market is open today.

### Background
------------

Sometimes when the prices don't move after opening at 9:15AM, I get confused whether it is a trading holiday (best case) or my network or trading platform is having problems.

If you check for NSE trading holidays, Google doesn't give any instant answer and points to the official pdf notice. You need to download and open it, check todays date against the list to finally get the information.

Its supposed to be a instant solution to this very small but repeating problem.

### Goals
----------

Development to-dos are tracked in `./todo.md` file.

Overall goals are :
1. Make 1 (existing) + 2 panels to show tomorrow's info and next opening/closing day.
2. Click on tomorrow's panel to load that day in main panel and update information in small panels with respect to tomorrow. (Route to any day in the financial year)
1. Make offline-first and update data when connected.