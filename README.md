# Codernote Frontend

Frontend: [codernote-frontend](https://github.com/tsushiy/codernote-frontend)  
Backend: [codernote-backend](https://github.com/tsushiy/codernote-backend)

## Develop on your local

### Install required packages

```sh
yarn
```

### Run Web App

```sh
yarn start
```

### Fix/Format code

```sh
yarn lint:fix
```

ユーザの認証にFirebase Authenticationを利用しています。  
自身で作成したFirebase Projectを利用する際には、`.env`を適切に設定してください。Codernote-BackendでJWTの検証を行うため、[ID トークンを検証する](https://firebase.google.com/docs/auth/admin/verify-id-tokens?hl=ja)を参照してCodernote-Backendでの検証周りの設定を適切に設定してください。具体的には、`auth.go`内の`audience`と`issuer`を変更してください。
