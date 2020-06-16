# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/core/actions/#custom-actions/


# This is a simple example for a custom action which utters "Hello World!"

# from typing import Any, Text, Dict, List

# from rasa_sdk import Action, Tracker
# from rasa_sdk.executor import CollectingDispatcher


# class ActionHelloWorld(Action):

#     def name(self) -> Text:
#         return "action_hello_world"

#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

#         dispatcher.utter_message(text="Hello World!")

#         return []

from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher


class ActionFindBookCategory(Action):

    def name(self) -> Text:
        return "action_find_book_category"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(
            text="Các thể loại sách phổ biến là: Fiction " +
                    "Business, Finance & Management, " +
                    "Personal Development, " +
                    "Children's Books, " +
                    "Dictionaries & Languages, " +
                    "Teaching Resources & Education, " +
                    "Other languages, " +
                    "Other categories"
            )

        return []


class ActionFindBookPublisher(Action):

    def name(self) -> Text:
        return "action_find_book_publisher"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        dispatcher.utter_message(
            text="Các nhà xuất bản sách phổ biến là: Cambridge " +
                    "Cengage, HarperCollins, " +
                    "Hachette, " +
                    "McGrawHill, " +
                    "Macmillan, Oxford, " +
                    "Parragon, Pearson, " +
                    "Penguin, Sterling, " +
                    "Usborne"
            )

        return []

class ActionFindBookBestSeller(Action):
    def name(self) -> Text:
        return "action_find_book_best_seller"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        import data
        idList = data.best_seller['Book_ID'].to_list()
        nameList = data.best_seller['Name'].to_list()

        responstText = "There are some best seller book: \n"
        for i in range(0, len(idList)):
            responstText = responstText + "\n - " + nameList[i] + "\n" + "Link: " + "http://localhost:3000/book/" + idList[i] + ""

        dispatcher.utter_message(
            text=responstText
        )

        return []

class ActionFindCurrentBookSales(Action):
    def name(self) -> Text:
        return "action_find_current_book_sales"

    def run(self, dispatcher: CollectingDispatcher, 
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        import data
        idList = data.current_sales['ID'].to_list()
        nameList = data.best_seller['Name'].to_list()

        responstText = "Books are on promotion: \n"
        for i in range(0, len(idList)):
            responstText = responstText + "\n - " + nameList[i] + "\n" + "Link: " + "http://localhost:3000/book/" + idList[i] + ""

        dispatcher.utter_message(
            text=responstText
        )

        return []

class ActionFindHighestRatingBook(Action):
    def name(self) -> Text:
        return "action_find_highest_rating_book"

    def run(self, dispatcher: CollectingDispatcher, 
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        import data
        idList = data.current_sales['ID'].to_list()
        nameList = data.best_seller['Name'].to_list()

        responstText = "Books are rated high: \n"
        for i in range(0, len(idList)):
            responstText = responstText + "\n - " + nameList[i] + "\n" + "Link: " + "http://localhost:3000/book/" + idList[i] + ""

        dispatcher.utter_message(
            text=responstText
        )

        return []

