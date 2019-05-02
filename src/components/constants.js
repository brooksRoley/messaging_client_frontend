export const getConversation = {
  "page": 0,
  "total": 1,
  "data": {
    "conversations": [
      {
        "uuid": "1FCA5132-535C-489E-B1C8-6ABDD34FFF8A",
        "name": "Yasyf Mohamedali",
        "unread": 1,
        "last_message": {
          "uuid": "89A76DA9-930D-4C31-9997-3878364F7559",
          "body": "Hello, World!",
          "direction": "incoming",
          "created_at": "2018-08-20T22:33:28.660Z"
        }
      }
    ]
  }
}

export const conversationsWithId = {
  "page": 0,
  "total": 1,
  "data": {
    "messages": [
      {
        "uuid": "89A76DA9-930D-4C31-9997-3878364F7559",
        "body": "Hello, World!",
        "direction": "incoming",
        "created_at": "2018-08-20T22:33:28.660Z"
      }
    ]
  }
}

export const BASE_URL = "https://sec.meetkaruna.com/api/v1";

export const QUERY_PARAMS = "?user_id=brooksRoley&page=0&per_page=10";
