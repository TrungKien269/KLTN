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
* ask_func_list
  - utter_ask_func_list

## ask for name
* ask_name
  - utter_ask_name

## ask name
* ask_name
  - utter_ask_name

## ask functionality
* ask_func_list
  - utter_ask_func_list

## thank
* thank
  - utter_thank

## ask book category
* ask_book_category
  - action_find_book_category

## ask book publisher
* ask_book_publisher
  - action_find_book_publisher

## ask book best seller
* ask_book_best_seller
  - action_find_book_best_seller

## ask current book sales
* ask_current_book_sales
  - action_find_current_book_sales

## ask highest rating book
* ask_highest_rating_book
  - action_find_highest_rating_book

## ask payment method
* ask_payment_method
  - utter_ask_for_payment_method

