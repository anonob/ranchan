# <img src="https://raw.githubusercontent.com/anonob/ranchan/master/public/images/icon/ranleaf-title-256.gif" alt="ranchan" style="height:256px"/>
> Random thread discovery client for *chan boards

## About
*random-chan*, or *ranchan* for short, sets out to aggregate threads from all across the internet into one page and serve them to users in a novel manner. By introducing a limited set of controls and preferences, users can fine tune their experience from a purely random search across all *chan sites, to one which matches the sites, interests, and interactions they choose. With the elimination of title and caption text, choosing to visit a thread becomes much more about what is visually appealing and consumable, with the actual topic of discussion acting as the reward for a user's curiosity.

By default, the site's background consists of title banners scraped from 4chan in a randomly generated marqueue covered with a colored filter, while the foreground hosts thumbnails that can be clicked to open their corresponding threads from various chan-based sites.

###### PHASE: Alpha
###### VERSION: 0.1.2
## Features/Improvements List
*-Below is a list of possible features/improvements (in no particular order) to add to the site as it is currently still in alpha-*
*-The site relies on technologies such as bootstrap as a means of speeding up production, and will be phased out during beta-*
- Add support for chan boards besides 4chan (will require writing a manual web-scraping scripts as opposed to using ajax with 4chan's API)
- Add support for archive boards
- Add google analytics API to monitor site traffic and collect performance data for further site optimization down the road
- Button linking to repo here on github
- Button that randomly selects a "mode" which alters various aspects of the page's appearance and how content is loaded
- Add music to site (youtube API?)
    - Selected randomly from a pre-built list
    - Allow the user to link their own song/playlist
- Menu to allow users to specify:
    - Which *chan sites to include
    - Which boards on each specified chan site to include
- Button to toggle censorship filtering such that the site displays:
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
- Improved dynamic loading/caching of the background banner images to decrease load
- Loading screen when first entering the site to allow time for banner images to be fetched
- Mobile/Tablet responsiveness
- Any optimizations that can be done in terms of performance and caching
- Secrets and (づ｡◕‿‿◕｡)づ

If you wanna suggest a new feature/improvement (besides telling me to go kill myself), just figure out how to get in touch with me or open a new [issue](https://github.com/anonob/ranchan/issues/new) or something