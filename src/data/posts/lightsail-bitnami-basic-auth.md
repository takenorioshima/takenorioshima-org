---
title: "Amazon Lightsail の WordPress インスタンスで Basic 認証を使いたい"
excerpt: "Amazon Lightsail の WordPress インスタンスで Basic 認証を使いたい"
date: "2023-06-01"
tags: ["programming"]
---

Amazon Lightsail で WordPress のインスタンスを作成すると、Bitnami の WordPress パッケージがインストールされます。

- Apache な .htaccess がそのままだと使えない
- Bitnami パッケージ内のパスがアップデートで変更があったりして混乱する

ことからまとめました。

## やりたいこと

- WEB サーバ上の特定のディレクトリに Basic 認証を追加したい

## Bitnami での DocumentRoot を確認する

デフォルトの DocumentRoot ( wp-config.php が置いてあるディレクトリ )は `/opt/bitnami/wordpress` となっていました。これは `/opt/bitnami/wordpress/wordpress-vhost.conf` で設定されています。

今回は WordPress の管理画面である `wp-admin` ディレクトリに Basic 認証を追加してみようと思います。Basic 認証の対象とするディレクトリのパスは先ほどの DocumentRoot とあわせて `/opt/bitnami/wordpress/wp-admin` となります。

## Basic 認証で使用する .htpasswd の生成

Bitnami に便利な htpasswd 生成ユーティリティがあったので、これで .htpasswd を作成してみましょう。オプション `-cb` を付けて、保存先のパス・ユーザ名・パスワード を渡すことで .htpasswd を生成してくれます。保存先のパス・ユーザ名・パスワードは適宜変更してください。

```sh
% sudo /opt/bitnami/apache/bin/htpasswd -cb /opt/bitnami/apache/wordpress_admin_users USERNAME PASSWORD
```

生成された .htpasswd を確認してみます。

```sh
% tail /opt/bitnami/apache/wordpress_admin_users
USERNAME:$apr1$/oN2HDwc$TN5kni.k81uffIJXJTE2L1
```

ユーザ名と MD5 変換されたパスワードが確認できました。便利 😃

## Basic 認証を追加する

Bitnami の htaccess 設定ファイルを編集し、Basic 認証を追加しましょう。`/opt/bitnami/apache/conf/vhosts/htaccess/wordpress-htaccess.conf` に追記します。

```sh
% sudo vi /opt/bitnami/apache/conf/vhosts/htaccess/wordpress-htaccess.conf
```

追記する内容は今回このようになりました。

```diff:wordpress-htaccess.conf
  <Directory "/opt/bitnami/wordpress/wp-content/plugins/akismet">
    # Only allow direct access to specific Web-available files.

    # Apache 2.2
    <IfModule !mod_authz_core.c>
      Order Deny,Allow
      Deny from all
    </IfModule>

    # Apache 2.4
    <IfModule mod_authz_core.c>
      Require all denied
    </IfModule>

    # Akismet CSS and JS
    <FilesMatch "^(form\.js|akismet\.js|akismet-frontend\.js|akismet\.css)$">
      <IfModule !mod_authz_core.c>
        Allow from all
      </IfModule>

      <IfModule mod_authz_core.c>
        Require all granted
      </IfModule>
    </FilesMatch>

    # Akismet images
    <FilesMatch "^logo-(a|full)-2x\.png$">
      <IfModule !mod_authz_core.c>
        Allow from all
      </IfModule>

      <IfModule mod_authz_core.c>
        Require all granted
      </IfModule>
    </FilesMatch>
  </Directory>

+ # Basic 認証をかけるディレクトリのパスと .htpasswd のパスを追加
+ <Directory "/opt/bitnami/wordpress/wp-admin">
+  AuthType Basic
+  AuthName "Authentication required"
+  AuthUserFile "/opt/bitnami/apache/wordpress_admin_users"
+  Require valid-user
+ </Directory>
```

サーバを再起動して、設定を有効化します。

```sh
% sudo /opt/bitnami/ctlscript.sh restart apache
```

![Basic Auth](/assets/posts/lightsail-bitnami-basic-auth/basic-auth.jpg)

ユーザ名/パスワードの入力が求められること・また認証が通ることを確認して、設定は完了です。おつかれさまでした 🙂

## 参照したサイト

- [Bitnami - Understand The Default Apache Configuration](https://docs.bitnami.com/aws/apps/wordpress/get-started/understand-config/)
- [Bitnami - Password-Protect Access To An Application With Apache](https://docs.bitnami.com/aws/infrastructure/lamp/administration/use-htpasswd/)
