# JS Notes:
1. In <html lang="en"></html> tag, use lang attribute to make search easier for engines. Otherwise the search engines have to check region etc to identify which group of audience to be targeted for a website.

2. In <script src="app.js" defer></script> use defer to indicate that the js should be loaded after the html part is finished loading. Else, if we try to find an element by eg: document.querySelector("button"); will return null as js loaded already even before the button got rendered to dom and hence couldn't find it.
