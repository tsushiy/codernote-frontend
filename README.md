# Codernote Frontend

## Start the app on your local

```sh
yarn start
```

ユーザの認証にFirebase Authenticationを利用しています。  
自身で作成したFirebase Projectを利用する際には、`.env`を適切に設定してください。  
また、Codernote-BackendでJWTの検証を行うため、[ID トークンを検証する](https://firebase.google.com/docs/auth/admin/verify-id-tokens?hl=ja)を参照してCodernote-Backendでの検証周りの設定を適切に設定してください。具体的には、`auth.go`の`audience`と`issuer`ｆを変更してください。
