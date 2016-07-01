<a target="_blank" href="http://ranchan.moe">
    <img src="https://raw.githubusercontent.com/anonob/ranchan/master/public/images/icon/ranleaf-title-256.gif" alt="ranchan" style="height:256px"/>
</a>

## About
> Random thread discovery client for *chan boards

###### PHASE: alpha
###### VERSION: 0.1.3
*random-chan*, or *ranchan* for short, is a simple web client which sets out to aggregate threads from <a target="_blank" href="https://en.wikipedia.org/wiki/Imageboard">imageboard websites</a> (such as <a target="_blank" href="https://en.wikipedia.org/wiki/4chan">4chan</a>) into a single page, serving them to users in a random and entertaining manner. Images, which correspond to threads, pop up on the page for a limited time; clicking on an image will open its thread in a new tab. By introducing a limited set of controls and preferences, users can fine tune their experience from a purely random search across all *chan sites, to one which more closely matches the sites, interests, and interactions they choose. With the elimination of title and caption text, deciding to visit a thread becomes much more about what is visually appealing and consumable, with the actual content of a thread serving as the reward for a user's curiosity.

## Features/Improvements List
*-Below is a list of possible features/improvements (in no particular order) to add to the site as it is currently still in alpha-*

*-The site relies on technologies such as bootstrap as a means of speeding up production, and will be phased out during beta-*
- Add support for chan boards besides 4chan (will require writing manual web-scraping scripts as opposed to using ajax with 4chan's API)
- Add support for archive boards
- Add google analytics API to monitor site traffic and collect performance data for further site optimization down the road
- *(alpha-complete as of 06/14/16)* Button linking to repo here on github
- Button that randomly selects a "mode" which alters various aspects of the page's appearance and how content is loaded
- Add music to site (youtube API?)
    - Selected randomly from a pre-built list
    - Allow the user to link their own song/playlist
- Menu to allow users to specify:
    - Which *chan sites to include
    - Which boards on each specified chan site to include
- *(alpha-complete as of 06/14/16)* Button to toggle censorship filtering such that the site displays:
    - Both SFW and NSFW boards as specified by the settings (default)
    - Filter out any NSFW boards from the user's settings (SFW boards only)
    - Filter out any SFW boards from the user's settings (NSFW boards only)
- Button to toggle activity filtering such that the site displays:
    - Both live and archived threads as specified by the settings
    - Filter out any archived threads from the user's settings (live threads only) (default)
    - Filter out any live threads from the user's settings (archived threads only)
- Enable users to save multiple different configurations of settings
- Tag-based searching system for finer control over the topic, to a degree
- Create a more pseudo-random algorithm in order to place images randomly on the screen, but reduce the amount of overlapping and clustering that occurs
- Improved dynamic loading/caching of the background banner images to decrease network load
- Loading screen when first entering the site to allow time for banner images to be fetched
- Mobile/Tablet responsiveness
- Any optimizations that can be done in terms of performance and caching
- Secrets and (づ｡◕‿‿◕｡)づ

If you want to suggest a new feature/improvement (besides telling me to go kill myself), just figure out how to get in touch with me or open a new [issue](https://github.com/anonob/ranchan/issues/new) or something