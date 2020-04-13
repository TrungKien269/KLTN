## happy path
* greet
  - utter_greet
* mood_great
  - utter_happy

## sad path 1
* greet
  - utter_greet
* mood_unhappy
  - utter_cheer_up
  - utter_did_that_help
* affirm
  - utter_happy

## sad path 2
* greet
  - utter_greet
* mood_unhappy
  - utter_cheer_up
  - utter_did_that_help
* deny
  - utter_goodbye

## say goodbye
* goodbye
  - utter_goodbye

## bot challenge
* bot_challenge
  - utter_iamabot

## ask for name and functionality
* greet
  - utter_greet
* ask_name
  - utter_ask_name
* ask_func_list
  - utter_ask_func_list
* goodbye
  - utter_goodbye
  
## ask for functionality
* greet
  - utter_greet
* ask_func_list
  - utter_ask_func_list
* goodbye
  - utter_goodbye

## ask for name
* greet
  - utter_greet
* ask_name
  - utter_ask_name
* goodbye
  - utter_goodbye

## ask name - ask functionality
* ask_name
  - utter_ask_name
* ask_func_list
  - utter_ask_func_list

## thank
* thank
  - utter_thank

## ask book category
* greet
  - utter_greet
* ask_book_category
  - action_find_book_category

## ask book publisher
* greet
  - utter_greet
* ask_book_publisher
  - action_find_book_publisher
