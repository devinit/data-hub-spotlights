# Data Hub Spotlights

Contains re-designed spotlights on Uganda and Kenya, perhaps others

## Development

- Install dependencies with:

      npm install

- Create a `.env` file and add CMS_URL, setting it to the most updated version of the DI Website. Defaults to `http://devinit.org/`.
If the dependent spotlights code has not been pushed to the live website, defer to either the dev server `http://dev.devinit.org/` or your own local copy on the `develop` branch

- When pointing to your local copy of the website, spotlight assets must be imported from the [DataHub CMS](https://github.com/devinit/datahub-cms) repo.
This requires two commands:

        ./manage.py fetch_spotlight_data
        ./manage.py import_spotlight_data

  You must then login to the admin section and under a `Data` page, create a new SpotlightPage e.g Spotlight on Uganda, the choose the appropriate imported spotlight under the `Meta` section. You can check to see if all your data is coming through properly by pasting `[Your Website URL]/api/spotlights/page/[Spotlight Page Slug]/` in your browser.

- Run dev environment with:

      npm run dev

- [At the Moment] Initial view is the playground. To view the spotlight page, go to `https://localhost:3000/spotlight/[SpotlightPage Slug]/`

### Run application with docker

- In the application's root directory run the following command to build an image:

      docker build -t <image_name> .

   replace <image_name> with any image name of choice

- Run the app container basing on the image created above using:

      docker run -p <host_port>:3000 --name <container_name> -e CMS_URL="<host_url>" <image_name>

   replace the:

               <host_port> with any port value you wish to display the application

               <container_name> with a container name of your choice

               <host_url> with the url of the server

               <image_name> with the name of the image you built in the previous step
