<br />
<p align="center">
  <img src="assets/favicon.png" width="350px" alt="Logo" >
  <br />
  <p align="center">
    Real-time Low Bandwidth Drawing Board ✏️
    <br />
    <br />
    It helps people to share own sketches Real-time.
    <br />
    <br />
    Built over Socket ❤️
    <br />
    <br />
    <a href="https://github.com/debdutgoswami/lenzo/issues/new?assignees=&labels=&template=bug_report.md&title=">Report Bug</a>
    ·
    <a href="https://github.com/debdutgoswami/lenzo/issues/new?assignees=&labels=&template=feature_request.md&title=">Request Feature</a>
  </p>
</p>

---

## Features

1. Real-time

2. Low Bandwidth

3. Shareable Room Link

4. Adjustable Brush Size

---

## Contributing

1. Clone the repository

    ```shell
    git clone git@github.com:debdutgoswami/lenzo.git
    cd lenzo/
    ```

2. Create a separate branch for each feature

    ```shell
    git checkout -b <branch-name>
    ```

3. Make your changes

4. Create a Pull Request. Follow the [PR guidelines](/CONTRIBUTING.md#pull-request-process)

### Note

Before starting with your day's development, perform a pull from the `develop` branch
   
```shell
git pull origin develop
```
---

## Running Backend ONLY

1. Go to `docker/backend`

    ```shell
    cd docker/backend
    ```

2. Execute the `run-server.sh`

    ```shell
    chmod +x run-server.sh
    ./run-server.sh
    ```

    **NOTE**: If you are on Windows system, then you need to manually execute the `run-server.sh` commands without `sudo`

---

## API Documentation

Once you have your backend up and running successfully, simply go to `/docs` to look into the API documentations. Furthermore, you can go to `/playground` to test out those APIs.

---

## Running Client

1. Go to `src/client`

   ```shell
   cd src/client
   ```
   
2. Copy the contents of `example.env.development.local` to `.env.development.local`

   ```shell
   cp config/example.env.development.local .env.development.local
   ```
   
3. Start the client

   ```shell
   npm start
   ```

**Custom Environment Docs**

- https://create-react-app.dev/docs/adding-custom-environment-variables/
