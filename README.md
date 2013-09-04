LetterTap
=========

The idea
---------

Letter Tap is an implementation of a one-dimensional input keyboard. Inspired by [Jean-Dominique Bauby](http://en.wikipedia.org/wiki/Jean-Dominique_Bauby) it is primarily and initially meant to be used as an assistive technology. I envision that it will be used by someone who can tap a device without precision to communicate to a carer or loved one nearby, also watching the screen.

Hypothetical uses include other one dimensional input situations such as smart watches, or  assistive devices controlled by facial movements.

Technology
----------

The current initial prototype is a client side web implementation. There are advantages to creating a native tablet application (such as native autocorrect and predictive text functions), and this may come at a later stage.

It uses jQuery Mobile and is targetted at my iPad mini and iPhone 5. It should be responsive enough to work on most touch devices.

Features
---------

One letter shows at a time, taking up most of the screen. The rest of the screen is used to show the word currently typed, and a couple of buttons for the carer of the user. These buttons are Clear and Settings.

The only settings are to use a frequency-of-use sorted alphabet instead of the normal alphabet and speed options.

Roadmap and known issues
------------------------

* Fix FOUC
* Deal with long typed words and sentences
* User testing to determine whether it needs a "Tap to Start" option
* User testing to determine whether it needs a  space option
