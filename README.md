## Notes
- There are no tests. If you want I can write tests to prove that I can (and do) write tests.
- Next steps I would take are:
  - Loading indicators for transition smoothness.
  - Error handling flows with compensations for a failing API for example.
  - Creating an awesome look and feel. (Because that simply takes time)
- You can login with the specified credentials. You cannot logout. (Would logout automatically after 7 days). If you want to logout you can clear the local storage.

## About the project
Included routing, components and services to show I know Angular basics.
Included an auth guard
Included http interceptors for 
  - cors, 
  - adding jwt tokens to requests 
  - and failing authentication (=logout)
Used bootstrap for ease in the design

## Functionality
- Select dates
  - It does not filter on dates, 
  - but uses the dates to provide detailed pricing information in the detail page.
- Select a price range (=filter)
- View car pricing details for the selected dates.
  - The order of pricing information is unusual, but fine for this project I suppose.