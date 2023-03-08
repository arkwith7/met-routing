

# AIDocs-Admin

## Admin 애플리케이션 프로젝트에 대한 기술 스택과 소스구성 디렉토리 설명

  - Frontend: [React.js](https://reactjs.org/)

  - Design: [Material UI](https://mui.com/)

    <details><summary>Frontend Folder Structure</summary> 

    프런트엔드(Frontend) 소스 폴더 구조는 아래와 같습니다: 

    `src` 나중에 빌드를 만드는 데 사용할 작업 파일이 포함된 폴더입니다. **src** 폴더에는 다음과 같은 폴더가 포함되어 있습니다.:

      - `actions` - 애플리케이션 전역 변수관리를 위한 react-redux에서 store에서 데이터를 쓰거나 가져오기 위해 사용자가 redux에 발행하는 명령

      - `components` -  이 폴더는 프로젝트의 UI 구성요소 모음으로 구성됩니다.

      - `context` -  모든 컨텍스트파일(context files)을 포함합니다.;

      - `images` - 프로젝트에 사용된 모든 이미지를 포함합니다. 

      - `pages` - 이 폴더에는 CRUD에 대한 일반 구성 요소가 포함되어 있습니다.

        - `CRUD/Users` folder, which includes `form`, `helpers`, `page`, `tables` folders; 

        - `dashboard` folder;

        - `error` folder;

        - `login` folder;

        - `reset` folder;

        - `starter` folder;

        - `user` folder;

        - `verify` folder.

      - `reducer` - react-redux에서 애플리케이션에서 작업을 수행하고 작업을 수행하며 전달된 작업을 기반으로 새 상태를 반환하는 함수를 포함합니다.

    `public` - 사이트의 웹 액세스 가능한 루트입니다. 기본적으로 해당 폴더에 있는 것은 무엇이든 브라우저 주소 표시줄에서 열 수 있습니다. 서버는 공개되지 않은 파일에 대한 사용자 액세스를 제공하지 않습니다.
    </details>

  - Backend: [NodeJS](https://nodejs.org/ko/)

    <details><summary>Backend Folder Structure</summary>   

    백엔드(Backend) 소스는 다음과 같은 폴더 구조를 갖습니다.: 

    `src` 나중에 빌드를 만드는 데 사용할 작업 파일이 포함된 폴더입니다. **src** 폴더에는 다음과 같은 폴더가 포함되어 있습니다.

      - `auth` - 인증(authentication) 및 승인(authorization)을 위해 라이브러리 구성

      - `db` - 데이타베이스 엔티티(Table) 정보 폴더들:

        - `api` - 데이타베이스의 각각의 엔티티(Table)들을 CRUD(Create,Read,Update,Delete)하는 함수로 구성;

        - `migrations` - 데이터베이스에 데이블 생성 및 레이아웃 반영등의 일련의 작업 수행;

        - `models`- 백엔드(backend)용 데이터베이스 데이블을 명세화;

        - `seeders` -  데이터베이스의 각각 데이블에 초기 데이터를 생성.

      - `routes` - 이 폴더에는 Express Router를 사용하여 생성한 모든 경로가 포함되며 이러한 경로는 **services**와 **db/api**의 파일로 내보내진다.;

      - `services` - `이메일(emails)` 및 `알림(notifications)`과 같은 폴더를 포함하고 데이타베이스 테이블에 가각의 엔티티별로 CRUD하는 기능 함수 호줄.   
    </details> 

  - Database: Microsoft SQL Server 2019

  -----------------------
### 로컬에서 프로젝트를 시작하는 두 가지 방법을 제공: 프런트엔드 및 백엔드에서 각각 실행하거나 Docker를 사용
-----------------------

## 프로젝트 애플리케이션 구동 방법:

### Backend:

> Please change current folder: `cd backend`

#### Adjust local db:
  - MSSQL Docker 활용:

    - [MS Docker이미지 사이트](https://learn.microsoft.com/ko-kr/sql/linux/quickstart-install-connect-docker?view=sql-server-linux-ver15&preserve-view=true&pivots=cs1-bash#pullandrun2019)에 접속하여 각각의 OS 또는 Shell에 맞게 작업한다

#### Create database:
`yarn db:create`

#### Start production build:
`yarn start`

### Frontend:

> Please change current folder: `cd frontend`

  ### Quick Start

  #### 1. Run `yarn install`

  This will install both run-time project dependencies and developer tools listed
  in [package.json](../project-files/package.json) file.

  #### 2. Run `yarn start`

  Runs the app in the development mode.

  Open http://localhost:3000 to view it in the browser. Whenever you modify any of the source files inside the `/src` folder,
  the module bundler ([Webpack](http://webpack.github.io/)) will recompile the
  app on the fly and refresh all the connected browsers.

  #### 3. Run `yarn build`

  Builds the app for production to the build folder.
  It correctly bundles React in production mode and optimizes the build for the best performance.

  The build is minified and the filenames include the hashes.
  Your app is ready to be deployed!

## To start the project with Docker:
### Description:

The project contains the **docker folder** and the `Dockerfile`.

The `Dockerfile` is used to Deploy the project to Google Cloud.

The **docker folder** contains a couple of helper scripts:

- `docker-compose.yml` (all our services: web, backend, db are described here)
- `start-backend.sh` (starts backend, but only after the database)
- `wait-for-it.sh` (imported from https://github.com/vishnubob/wait-for-it)

    > To avoid breaking the application, we recommend you don't edit the following files: everything that includes the **docker folder** and `Dokerfile`.

## Run services:

1. Install docker compose (https://docs.docker.com/compose/install/)

2. Move to `docker` folder. All next steps should be done from this folder.

   ``` cd docker ```

3. Make executables from `wait-for-it.sh` and `start-backend.sh`:

   ``` chmod +x start-backend.sh && chmod +x wait-for-it.sh ```

4. Download dependend projects for services.

5. Review the docker-compose.yml file. Make sure that all services have Dockerfiles. Only db service doesn't require a Dockerfile.

6. Make sure you have needed ports (see them in `ports`) available on your local machine.

7. Start services:

   7.1. With an empty database `rm -rf data && docker-compose up`

   7.2. With a stored (from previus runs) database data `docker-compose up`

8. Check http://localhost:3000

9. Stop services:

   9.1. Just press `Ctr+C`

## Most common errors:

1. `connection refused`

   There could be many reasons, but the most common are:

  - The port is not open on the destination machine.

  - The port is open on the destination machine, but its backlog of pending connections is full.

  - A firewall between the client and server is blocking access (also check local firewalls).

   After checking for firewalls and that the port is open, use telnet to connect to the IP/port to test connectivity. This removes any potential issues from your application.

   ***MacOS:***

   If you suspect that your SSH service might be down, you can run this command to find out:

   `sudo service ssh status`

   If the command line returns a status of down, then you’ve likely found the reason behind your connectivity error.

   ***Ubuntu:***

   Sometimes a connection refused error can also indicate that there is an IP address conflict on your network. You can search for possible IP conflicts by running:

   `arp-scan -I eth0 -l | grep <ipaddress>`

   `arp-scan -I eth0 -l | grep <ipaddress>`

   and

   `arping <ipaddress>`

2. `yarn db:create` creates database with the assembled tables (on MacOS with Postgres database)

   The workaround - put the next commands to your Postgres database terminal:

   `DROP SCHEMA public CASCADE;`

   `CREATE SCHEMA public;`

   `GRANT ALL ON SCHEMA public TO postgres;`

   `GRANT ALL ON SCHEMA public TO public;`

   Afterwards, continue to start your project in the backend directory by running:

   `yarn start`
