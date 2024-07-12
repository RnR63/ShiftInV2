# Route Directory

## Profile Router
`/profile`

  ### Settings Router
  `/profile/settings`
  - ✅ (POST) - `/profile/settings/create`
  - ❌ (PATCH) - `/profile/settings/update`
  - ❌ (PUT) - `/profile/settings/archive?id=id`

  ### Shifts Router
  `/profile/shifts`
  - ⏳ (GET) - `/profile/shifts/staff`
  - 🪳 (GET) - `/profile/shifts/filter?case=case`
  -  ⏳ (POST) - `/profile/shift/create`

  ### Requests Router
`/profile/requests`
  - ⏳ (GET) - `/profile/requests/all`
  - 🪳/❌ (GET/PATCH) - `/profile/requests/update`
  - ⏳ (POST) - `/profile/requests/create`
  - ❌ (PATCH) - `/profile/requests/cancel?id=id`

## Other Routers
- ✅ `/register`
- ✅ `/login`
- ⏳ `/dashboard` 
- ❌ `/logout` 


# Legend
- ✅ -> complete
- ⏳ -> needs testing
- 🚧 -> currently working on
- 🪳 -> has bugs
- ❌  -> has not started