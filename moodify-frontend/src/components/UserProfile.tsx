import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
export function UserProfile() {
  //Data needed would be user & userData ( favMoods, discSongs, and likedSongs).
  //Probably will need to host images and have encryption, we will do this later but keep in mind.
  /* User profile will have settings, logout functions.
  * The user will see the number of discovered songs, liked songs, favorite moods data.
  * 3 sections inside the popover, which will be shown when user clicks/hovers over profile pic.
  */
  return (
    <>
      <Popover>
        <PopoverButton>
          <img src="../public/vite.svg"/>
        </PopoverButton>
        <PopoverPanel className="bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md">
          <div>
            <div>
              <img src='../public/vite.svg'></img>
              <span>
                <h1>Username</h1>
                <h3>Email@gmail.com</h3>
              </span>
            </div>
            <hr/>
            <div>
              <div>
                <p>Liked Songs</p>
                <p>14</p>
              </div>
              <div>
                <p>Songs Discovered</p>
                <p>123</p>
              </div>
              <div>
                <p>Favorite Moods</p>
                <div>
                  <p>Badge</p>
                  <p>Badge</p>
                  <p>Badge</p>
                </div>
              </div>
            </div>
            <hr/>
            <div>
              <div>
                <p>Settings</p>
                <p>Log Out</p>
              </div>
            </div>
          </div>
        </PopoverPanel>
      </Popover>
    </>
  )
}