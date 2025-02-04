# Magoia Master Server

Esse repositório contém meu servidor pessoal. Nele, pretendo fazer diversas integrações para agregar funcionalidades ao meu Raspberry Pi / Home Assistant.

---

## Changelogs

Aqui você encontra o histórico de mudanças realizadas no projeto.

### [2024-12-07]

- Inicialização do repositório.
- Configuração básica do servidor Express com TypeScript.
- Adição do suporte ao `.env` para gerenciamento de variáveis de ambiente.
- Configuração do `nodemon` para recarregamento automático do servidor durante o desenvolvimento.

---

Sinta-se à vontade para contribuir, sugerir ideias ou reportar problemas!

```
magoia-master-server
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ ORIG_HEAD
│  ├─ branches
│  ├─ config
│  ├─ description
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  ├─ develop
│  │     │  ├─ feature
│  │     │  │  ├─ error-handler-strategy
│  │     │  │  ├─ fixing-notion-api
│  │     │  │  ├─ implementing-web-react-use-websocket
│  │     │  │  ├─ notion-api
│  │     │  │  ├─ setting-up-next-fe
│  │     │  │  ├─ setting-up-next-ui
│  │     │  │  └─ setting-up-routes
│  │     │  └─ main
│  │     └─ remotes
│  │        └─ origin
│  │           ├─ develop
│  │           ├─ feature
│  │           │  ├─ implementing-web-react-use-websocket
│  │           │  ├─ notion-api
│  │           │  ├─ setting-up-next-fe
│  │           │  ├─ setting-up-next-ui
│  │           │  └─ setting-up-routes
│  │           └─ main
│  ├─ objects
│  │  ├─ 00
│  │  │  └─ 3ecc2bb25967199c4efa6d9dd8b0681f638b01
│  │  ├─ 02
│  │  │  └─ 74a81f8ee9ca3669295dc40f510bd2021d0043
│  │  ├─ 03
│  │  │  ├─ 5728910d456476fa0da26d0a2dc2d0fc109e42
│  │  │  └─ a1227cfa176f4dd31b8088a96707c432157828
│  │  ├─ 04
│  │  │  └─ 95be3b94b823f3b5a8059a2fc6491e7ddc1456
│  │  ├─ 05
│  │  │  └─ 5b934338b630ab31970534e3cb2786991c075b
│  │  ├─ 06
│  │  │  ├─ 52bd4c9d35824b4b84a6db43611d18a515a645
│  │  │  └─ 717cb5b745f2d23a8084cb86a81e264280d706
│  │  ├─ 07
│  │  │  └─ 2917061e277c126b32136496bc35390da64543
│  │  ├─ 08
│  │  │  └─ a43a52426c72bdd82fc1b2cf96e65aab917e02
│  │  ├─ 09
│  │  │  ├─ 3077341ba558d7cab84486a3f64dc5c037a366
│  │  │  ├─ 67ef424bce6791893e9a57bb952f80fd536e93
│  │  │  └─ df870e7f004860592372e269caf3da13699bb1
│  │  ├─ 0a
│  │  │  └─ 2654f6a816b9689b82a5adc7e993c000515d5b
│  │  ├─ 0c
│  │  │  ├─ 81cef265807fa5b0952c1d5e440b3da38039d5
│  │  │  └─ a3939ffe4561eab756c97db9c7341adc079198
│  │  ├─ 0e
│  │  │  ├─ 7bd13fa4b995fca2ea714ee6f2d304bae7feca
│  │  │  └─ ca76fca2f8397a86bf4db5629dc2a5bf3dbf48
│  │  ├─ 10
│  │  │  └─ c8247a29f03b303f93dcc5ef5a92f8dc47a95f
│  │  ├─ 12
│  │  │  ├─ 3c45f1dbd69b39ca8f9d545ea6049177e761a3
│  │  │  ├─ 9bb5c5696445e6aa66e10dff9e06210be0d027
│  │  │  ├─ a703d900da8159c30e75acbd2c4d87ae177f62
│  │  │  └─ dc7854daa00841e7f3fbd5c869ffca45a798fc
│  │  ├─ 13
│  │  │  ├─ 53f99dd70b9564314321186b63850e10e5b082
│  │  │  └─ a1e2014be78d427d8bb000fa4160d2acf4995d
│  │  ├─ 16
│  │  │  └─ 9ad6951a997cd344dafd55ca432553fb28a73a
│  │  ├─ 19
│  │  │  ├─ 77b623d63a3bba6ec123ebd9d9dc794c9818fc
│  │  │  └─ f65be751f5f2fffaa307cf647557e468d724f5
│  │  ├─ 1b
│  │  │  ├─ 3be0840f3f6a2bc663b53f4b17d05d2d924df6
│  │  │  ├─ 8748c8c56b6a83e92f34e8557c7e87c095cac6
│  │  │  └─ f1f87451dbc1b9b4fbbe0e389615a687449d60
│  │  ├─ 1d
│  │  │  └─ a0f882c078e7a15a99aedfb4d3ce1cbed8739e
│  │  ├─ 1f
│  │  │  ├─ 4a1786289a48699a55084393ea7b2d536a1fa9
│  │  │  └─ b8e45e7aeb1f94888abb1d8523b9e24ce4cec7
│  │  ├─ 21
│  │  │  └─ e46d6d0bc5ff9063f3bd281a7d7e80dbb9aaa1
│  │  ├─ 22
│  │  │  ├─ 15aec82b383a09480cb621a071a782edd43f1d
│  │  │  └─ a8050c3a6435f699cbd6218c4db3e5ee2145cf
│  │  ├─ 23
│  │  │  └─ 7a044e419766646b77ae82a884e5df3a925dc0
│  │  ├─ 24
│  │  │  ├─ 86f1252bc40de4ba34ef0fcdabc208bb2c6789
│  │  │  └─ f17d3948233326510ef1234abf9589df9d12ba
│  │  ├─ 25
│  │  │  ├─ 8e1cbd0347adc37cbc6b93de58a030dcb5d429
│  │  │  └─ f2c155307ea69a71ecbaab797e6af44be914f1
│  │  ├─ 27
│  │  │  ├─ 4a9b3b321e73b1f204d12c3b43b3bb130d087e
│  │  │  ├─ 8aa498d3606c803efd1cfe79374a4b62a3b3ef
│  │  │  └─ dc59715fe289ff9b66625ccb13e9dc36689571
│  │  ├─ 29
│  │  │  ├─ 2caa4aa845037eaa09d09989d280b6b0113052
│  │  │  ├─ 66650d1430efb0742a41d6614578de7e1b6134
│  │  │  ├─ bd766f7bc9b8f4cf7f88ebe27ba5f860e84661
│  │  │  └─ db63e2070fd15c1a86e9f34726b077a93d0cc9
│  │  ├─ 2a
│  │  │  ├─ 105f1cf447aaaa6afd2b74ad8ee4f0a9d7e921
│  │  │  └─ 96583f6561b70b04d58ab5e66442e58457acbf
│  │  ├─ 2c
│  │  │  ├─ 33861168258be10ad2cde69b46ac6b3c593f3e
│  │  │  ├─ 63c0851048d8f7bff41ecf0f8cee05f52fd120
│  │  │  └─ 851b6cbf0d8f27e2885c218b24423fccf7bd11
│  │  ├─ 2d
│  │  │  ├─ a75676c1bed6b3ac26439f53c963069ae36550
│  │  │  └─ b7c7fa437c36af4c6f722474fff497f2bf3166
│  │  ├─ 2f
│  │  │  └─ 51b1a8c36a112cf56755069a81c4418c58eac0
│  │  ├─ 30
│  │  │  └─ 685fa808bb84d2b93007e62c5cf41ca964635f
│  │  ├─ 32
│  │  │  └─ f1e887eff8afafc2737ce5829bea625168e2e2
│  │  ├─ 33
│  │  │  ├─ 3ecee17d0534a92498d639a2d9b672bcc9607d
│  │  │  ├─ 6ee6b7b9398817002b7f934a1c9d4eb95f3211
│  │  │  ├─ e61ff2642f42a78b703a4c2613b91db5d75caf
│  │  │  └─ e99e03762b252fb199f6c3dd493242f7a4bc7f
│  │  ├─ 34
│  │  │  └─ 0be24a9b06746441ebe4c192f919aeefed2ca0
│  │  ├─ 35
│  │  │  ├─ c046ce65225f43ad1c4a7e2a6431fba58187bf
│  │  │  └─ ccbc778573630dccb8cc5c70595b1dde948c5a
│  │  ├─ 36
│  │  │  ├─ d518cb0791c7d36d040717b91a61e5107f3122
│  │  │  └─ e16d3926c45eeb4019c9475e6049ecdc7e1b9c
│  │  ├─ 37
│  │  │  └─ 79222da2b19d420f5a8bdc0305963152cfdedb
│  │  ├─ 38
│  │  │  ├─ 21dd6e2639a6c8ec91ea70380272bff74d2aed
│  │  │  └─ da31c631ce9e8863b6e2a4513b88f13b1a75b4
│  │  ├─ 3a
│  │  │  ├─ ab52e7569fe342ee68f7f3c4324ef7d4292f4d
│  │  │  └─ f2821ae7692830de0bd0a5f28950ecd48f7f03
│  │  ├─ 3b
│  │  │  ├─ d7458b01120e69eb22dd74798e206f1fcb9d1a
│  │  │  └─ ebeb7724f186bffb86a5c91ad92da0f181ca1f
│  │  ├─ 3c
│  │  │  ├─ 5cc83977f66d71f04313768d53cad7b5e997aa
│  │  │  └─ ff7b3fc2082c1a91c371896e6f846f8bd18fa8
│  │  ├─ 3d
│  │  │  ├─ 3acbade63ca4b31780fc3bceebfbe4f4aa8182
│  │  │  └─ d63892526af8fca15a6f7897c7c14806677ed0
│  │  ├─ 3f
│  │  │  └─ 4efed21c123f374c11d3b4101de12e324585a7
│  │  ├─ 40
│  │  │  └─ 762e1a2b54c5604e501d1a56fe13a4814240d6
│  │  ├─ 41
│  │  │  ├─ 1bc79aaaa0f02e58d560bfc3a24dff9cd8c719
│  │  │  └─ d3632cd26c5beba0012bcbc18fb158893cb3aa
│  │  ├─ 42
│  │  │  └─ 02686f7c7ce2ab588da8ebd02444c037b47b4a
│  │  ├─ 43
│  │  │  └─ 86bc4fb51b3e5b18f3c70caac648bf34dc0d1d
│  │  ├─ 44
│  │  │  └─ 02a61ea90394fd6d1fa3a8452426c56a050329
│  │  ├─ 45
│  │  │  └─ e5b4dbfae283849024abe38ba68f1689a0e6da
│  │  ├─ 46
│  │  │  └─ cd2186702a2ffc57e1b185637308b74117a73e
│  │  ├─ 47
│  │  │  └─ 1c0c2f2cf13e437bbc547ca2c6cd8420291bea
│  │  ├─ 49
│  │  │  └─ ead2ebabd6e166f3d21e991a8de04d6e75d7f5
│  │  ├─ 4b
│  │  │  └─ b54d83be478f15810e5062f8a482f7b7a1c638
│  │  ├─ 4c
│  │  │  └─ 224e6fb351c81bf38d318673e2c9c2102f9e0c
│  │  ├─ 4e
│  │  │  ├─ c19b498e68b9b14ea9351c446fbbe0706e3a59
│  │  │  └─ d8f1e68d44a2decf2ad79a2435b91bf2f09287
│  │  ├─ 4f
│  │  │  ├─ 0b7574d37d190f57b8706858d958af56f7b77b
│  │  │  ├─ 67d1c1d8f63eb24f37135bc8be3beda372bf0d
│  │  │  ├─ 6bdd042fd64d16d27c680881d8ab51243a381b
│  │  │  └─ 81009b147d5102aeb2544c0b1e5da0e9e93a63
│  │  ├─ 50
│  │  │  └─ b36af0009b2859a6f3fc75a3384e47a848eddc
│  │  ├─ 52
│  │  │  └─ 4eb15f3cc5f1e0a22677868633d06acbeb06e6
│  │  ├─ 54
│  │  │  └─ 027eb8ae73e3bb9490e8c18fa6604ac5ca48d3
│  │  ├─ 56
│  │  │  └─ f15790bd198daf74e227a82b75f4d23ce4229a
│  │  ├─ 59
│  │  │  ├─ ea9b739c958198e95366c527c21ec2023ebde3
│  │  │  └─ ec1bd52923411494502cdb5ac16efce3390105
│  │  ├─ 5b
│  │  │  ├─ 02cd869a403d4d1903b31c5f2bd53695b8d903
│  │  │  ├─ 33de70398bdc4cfad42e3a90d9aaaab22cdeeb
│  │  │  ├─ 3f3b25d2b58a645f1d9fef2865369dfab23bb6
│  │  │  └─ 52f6bf2276c2a122cb9548af391327db1477be
│  │  ├─ 5c
│  │  │  └─ 099fef46a7c0fa160ff9ff7ecfe71d12ae3dc8
│  │  ├─ 5d
│  │  │  └─ b75f10f6765865faf980684583674e0579b342
│  │  ├─ 5e
│  │  │  └─ ffec8dc44847cdfddfb61fe810c0c3a03b349e
│  │  ├─ 5f
│  │  │  ├─ 03b3d9ce628f5509d5bee7d8569ee4b1e6c81a
│  │  │  └─ 073925a81e3b164c73fdb16ada693ceac3cddb
│  │  ├─ 60
│  │  │  ├─ 65ca82b4b45fc41886ba0f3f01daa9e8198e1f
│  │  │  └─ 9e2f00ba270eef9f9a36c1704e86678a817b5e
│  │  ├─ 61
│  │  │  └─ 829004660f4873f44832e3b05132d881cd495e
│  │  ├─ 62
│  │  │  ├─ 19dee28acc522c8cfa8a95701cdeda79d17053
│  │  │  └─ 7ba9131936dad2e8e7af3cf88efb05b1dca104
│  │  ├─ 63
│  │  │  ├─ 55df4e557eda46113d5b489b1cc8f51b5c7215
│  │  │  ├─ 567c80e2731371bcb0eb0116a9ca67be3b1ee8
│  │  │  ├─ ac15d2d6f3f048d822a6686bfb5931201fbae1
│  │  │  ├─ b07082017b2896b4c471a1ccbcf1856e5783ba
│  │  │  ├─ d8b1b6514284174ceb48d7d604e1bafc6a40a8
│  │  │  └─ f79feefcab71b1a1b2eee67708377dc4d45864
│  │  ├─ 66
│  │  │  └─ 62a1c39abeadee388afeaf7d924b64d1af592d
│  │  ├─ 69
│  │  │  ├─ 165007da2e46607143e47961187946ec6f66f5
│  │  │  └─ 78c5f98b4a8e1c534ac99124884a21db3a73a1
│  │  ├─ 6a
│  │  │  └─ e5aaeede50b73c0dd2ed7765e852b00a3adfa6
│  │  ├─ 6d
│  │  │  ├─ 2099f56d09f4821fe027c3d7692b8eb204bd18
│  │  │  └─ ea9ab3383ce6e07bf6c69be6329b0ac5642649
│  │  ├─ 70
│  │  │  ├─ 3d158a3afec8744a0876be0a946350aeb070e5
│  │  │  ├─ 432136259e45cb249225ea373e8213e5000976
│  │  │  └─ 828764d51b622a8f07fe98072015891f06c570
│  │  ├─ 71
│  │  │  └─ fee5bbb93a4bd484adc8a3b035b3a06129cd7e
│  │  ├─ 74
│  │  │  └─ da4535b2422bb5baed3531cf99903bb0fa00a6
│  │  ├─ 77
│  │  │  └─ 572d74f4dafcd4b19f0ad76b02f23906ebde6a
│  │  ├─ 78
│  │  │  └─ 2f5a1db9dc51c0b94d9da5cb2823b9981f3898
│  │  ├─ 79
│  │  │  ├─ 315ccdbef381f66ff5752be5dbb70eab666d11
│  │  │  └─ 7527b95be604ab441b88cddea95898bee4c30d
│  │  ├─ 7a
│  │  │  ├─ 6983acb431580f13fc3c6c19e463de1dfd065a
│  │  │  ├─ 73a41bfdf76d6f793007240d80983a52f15f97
│  │  │  └─ f62b8e5cc88566f4af5cbade3a4e886b410810
│  │  ├─ 7b
│  │  │  ├─ fdb2cff80df288e09e7fb2eb372cc896f1851f
│  │  │  └─ fe17c7021649d9b0b3d156c4df62e596daad48
│  │  ├─ 7c
│  │  │  └─ 7551f601f713fee74a89daa2f4cfd064828867
│  │  ├─ 7d
│  │  │  └─ 795a9c08bfab2daeaf12cba311a2702172e5a6
│  │  ├─ 80
│  │  │  └─ 495f66fabbf6dec575f8e0710831de03a5233b
│  │  ├─ 81
│  │  │  ├─ 046c0c74268263fb154f384bf399c2aabcb798
│  │  │  ├─ 4a7685782c567a7349633dafc3c48ebd821344
│  │  │  ├─ 64f7dea6287d301c5d36c83628ec3c826466dc
│  │  │  ├─ a2777677e390400fa1d839a6a875025c6a1e81
│  │  │  └─ bbef52ba3ba4033ae011687ad93d9a436a3f93
│  │  ├─ 82
│  │  │  ├─ 325f43a8e9ab84bba41b17268cf9bbc0d9aafc
│  │  │  ├─ d3900da3f572a3c1c1d77e2e34b813efbdfe41
│  │  │  └─ d42d5971406e5eb622eb217f4412418caeed74
│  │  ├─ 83
│  │  │  ├─ 037232cad77763bbfc024bdc0a83143bcdc4aa
│  │  │  └─ a43bbdd888badcf76f5c197b087132dbfe7025
│  │  ├─ 84
│  │  │  └─ 829ab7879bc20234394ec28bb2215c33a32ce2
│  │  ├─ 86
│  │  │  ├─ 8a429c5bf2b5d0f7e6054d22301993860dd304
│  │  │  ├─ 9af2fa4e83affa42fd928d8151cf255d900a8b
│  │  │  ├─ 9c8ad93dd0f4ecf7879ddf6f4b356f0b7763ff
│  │  │  └─ e01fb9281befb6adf10f11ac75bdfcb1a968ac
│  │  ├─ 87
│  │  │  ├─ 2e68ba495f341ab5343612d574a385b17c5907
│  │  │  └─ 9ab2b9b15702fed43cd67407ecd04590245a45
│  │  ├─ 88
│  │  │  ├─ 46a71e7c2b9b2e62e13cb65c21a94efe49b0eb
│  │  │  └─ 77041af5bb5fadcc9ef05d6d9ffe2319fe85eb
│  │  ├─ 8f
│  │  │  └─ 862a9acdfd6b0dbc3bf8da102e78afaea18e37
│  │  ├─ 91
│  │  │  ├─ c4b31eb54865383a7fd1d6f3e948a405e73b98
│  │  │  ├─ e42fc2a878835b71ac2b4fcf3479e4259b1af5
│  │  │  └─ f3a5befd46043ddd6f19bf3985cee7214fc18b
│  │  ├─ 92
│  │  │  ├─ 52a4b91f59e8a5b16781cdc9b0b2f507e3a03a
│  │  │  ├─ d4247c5a743e6425d257f93b2732a9a9c36b07
│  │  │  └─ f4ebe0e6e0cdfe53d4a119ed813c6174135599
│  │  ├─ 95
│  │  │  └─ 55c39fe653a2b2ce7e18f7888a106317eba134
│  │  ├─ 97
│  │  │  └─ aca2ea1cd856e75af29f7562d6582a6feabbc0
│  │  ├─ 98
│  │  │  ├─ 1c1b8fddd5079f1f7b2c48f10acd7dc64f7058
│  │  │  ├─ 248d31a34948a7c2660eb5ad775eca9f097a4d
│  │  │  ├─ 2b757bbdc8969bb5dbee8c7ee42b5691f4c495
│  │  │  └─ 7ee39d0a2dbd4074a37b65053823367403a89e
│  │  ├─ 9a
│  │  │  └─ 71ec25471ba6d0982fa8407bc31ba863a52473
│  │  ├─ 9b
│  │  │  ├─ 0e7a6222ee6be2f2f895daf44bc57578c71479
│  │  │  ├─ 2beba0cd7afd3ee18e4ab1c2d56ca21def3b39
│  │  │  └─ e032a80aaba7e29d2d7b56a2992984f73db249
│  │  ├─ 9c
│  │  │  ├─ 9a2011615abd332f05dc151561c01f0f3f1934
│  │  │  └─ d72d315eee76960d69224cadf5d754129ab45a
│  │  ├─ 9d
│  │  │  ├─ bb89a4c8d63e3bd48375858f0d32ac1e7c35d4
│  │  │  ├─ eb49a073ca7578b23ea052ccc3a14b4663bfa6
│  │  │  └─ f314a6cef05998a65c2b423f08a4d1fcf7ad39
│  │  ├─ 9e
│  │  │  ├─ 40480704c884952256216e240a6f0342b9f459
│  │  │  ├─ c525ecc5281b9d4a760d3897be7fd7582bf205
│  │  │  └─ ea6726a230491a138f97a242e885c41af988ca
│  │  ├─ 9f
│  │  │  └─ 0185751c316197e3d0698869266305e9335a8b
│  │  ├─ a0
│  │  │  ├─ 591c13f547594226813621e772b71d1002a589
│  │  │  └─ e6f179c221de3b522556ccfd81eb53650f594d
│  │  ├─ a2
│  │  │  ├─ 53edac913e54af160df1ba151aafef281887d9
│  │  │  ├─ 93ef1a3b55a3eff534fc8db9e29a64dbc6758c
│  │  │  └─ e96b4209248c623668d56b3cd5e72d954b35ee
│  │  ├─ a3
│  │  │  ├─ 5848441f1d449e47e12cf763cec8a26754a3fa
│  │  │  ├─ 76afc31a1fab9d3f1ff33a7428052e0a5adac5
│  │  │  ├─ d12755c6a3a9876fc26e04bf1730233921f24a
│  │  │  └─ ed196d51c9bf739ad7eb9014e2c4a0522d3ca6
│  │  ├─ a4
│  │  │  ├─ 3710602d62dc081d2ce012acede1d5fccdb9fb
│  │  │  ├─ 8542200ac0e1cc43a36084550f7c30c7d726c6
│  │  │  ├─ af5c1cd13b6ef9d72678dfeb65f7adb80405a2
│  │  │  └─ e9f1741c61b8964813b0fd08b322d40d4e6823
│  │  ├─ a6
│  │  │  └─ 781a5866cf44809a95e82a38d7d6a0d5c98f95
│  │  ├─ a7
│  │  │  └─ 5018fbd9da09c73c6a012bb0e013aacb95ccb1
│  │  ├─ a8
│  │  │  └─ f3bda87a62091af179a0786c8601083cd0282a
│  │  ├─ a9
│  │  │  └─ 661239d68c0d2084c844e911a4f3d8492b19d0
│  │  ├─ aa
│  │  │  └─ 929e0103edb721dabc4b4d3f51073c2b1af6e4
│  │  ├─ ab
│  │  │  ├─ 2533070e0d66f2ef0158ef82515d9defe2fe55
│  │  │  ├─ de7a1d740e77ad62d1a82280173357ea2aac36
│  │  │  └─ eb7ee1a019a001c1c9e67cf281fb314e80c007
│  │  ├─ ac
│  │  │  └─ c3f47c79ace90c59d29348f14b28da9109e64c
│  │  ├─ ad
│  │  │  ├─ 95d870e19ad0406f445de2b179c48e98a57627
│  │  │  └─ f0b3826c1d3a8859ec90021ae6525b54ab0043
│  │  ├─ ae
│  │  │  └─ c49050f811a8502b494317874406736afca80d
│  │  ├─ af
│  │  │  └─ d77f9989cbcbfb2d58bb4ab58e80bcb50517b5
│  │  ├─ b0
│  │  │  ├─ 63b3d15a4bf51d0729a01820d621ca278d66ab
│  │  │  └─ f87dea50159d6cfef3783ed60dbb9ae3e3f837
│  │  ├─ b3
│  │  │  └─ 59c63cfe76324918f866c93402abe5af1ce6f4
│  │  ├─ b5
│  │  │  ├─ 0142d691a7fc61f28c0911ddd0ddb63bde1d57
│  │  │  └─ c61c956711f981a41e95f7fcf0038436cfbb22
│  │  ├─ b6
│  │  │  └─ 0d07b38d2fbfed51b1ef70703c60e78943415c
│  │  ├─ b7
│  │  │  ├─ 3a66efed2a18c2fc961acd73ecf9d8842c6443
│  │  │  ├─ 5143b6f709a62cc3fbf38d87610476b3b6532c
│  │  │  ├─ 8faba875535de301a6e075bd85d7b609f43fa4
│  │  │  └─ c133f48a0a62ff2396b4b0ca402c034e667107
│  │  ├─ b8
│  │  │  ├─ 33fefcf28076287f997f717ecfd77cea95fb61
│  │  │  ├─ 6c2286a1aad1c298f12d297112cd6eefe7fff5
│  │  │  ├─ 6e6feacb10e6e963a8dfafe09dcdefe5743525
│  │  │  └─ ac26297ca15193027ae44a2f99c77be5892948
│  │  ├─ ba
│  │  │  ├─ 08e25127e3eb213642e5e385ad33cd80209e3b
│  │  │  ├─ 6c585e9413025c880b29085e8707be111e0a69
│  │  │  ├─ 866f1abfd9d1086a86ee0ffdf77455fcb9ac01
│  │  │  └─ 9d06e2ff3b585c10ad0c341a6eb79dd40b09f4
│  │  ├─ bb
│  │  │  └─ d4191ba51e0e745675f72273e47d96d164d383
│  │  ├─ bc
│  │  │  └─ 302e799e3341ddb936ac4be3802a68e86ab9e1
│  │  ├─ bd
│  │  │  ├─ 11403d3a87b296f3c660ddc0858a696c691345
│  │  │  └─ fa6b815298631d446ae10b8f2783adb5b49835
│  │  ├─ be
│  │  │  ├─ 4de254fe258b3834984bcf1298f3f63010361b
│  │  │  └─ 7052e772a2d5d3eb86554c4a6415f17496a690
│  │  ├─ bf
│  │  │  ├─ 577cd4628dd052a7fca173b82a5bdcb8a2b075
│  │  │  └─ a028754f5ea268a9d3be816c426e9ffe917fa2
│  │  ├─ c0
│  │  │  ├─ 28cc88e418e725dcdef02bced0fdb3894b94b5
│  │  │  ├─ 4e225a0807bd44579b6b4f49ec57cc28933435
│  │  │  ├─ 93ee60ddee0aca582816297fc03cb9dac433b4
│  │  │  └─ ca2cadbb869efec931af8db0accde7f4c7f3db
│  │  ├─ c2
│  │  │  ├─ 2f8d703c09925e9fba4406c61066992df5bfcb
│  │  │  ├─ 3b93bf974125813f956740ec6e6c78f9c17b27
│  │  │  └─ d0d61fd73dc0ed5181239864bd224ee39417e9
│  │  ├─ c4
│  │  │  └─ 7402c0e34c0669527e57c4b5e1524ed24fe006
│  │  ├─ c5
│  │  │  └─ 6c690e860a49b3dc9129eac3e358e2f75f5bf7
│  │  ├─ c6
│  │  │  └─ 1af0d6fa146e94d7ca0deaeec714a004e1adb2
│  │  ├─ c7
│  │  │  ├─ 349a487cba44618a2b017a26fc128dd4e35acf
│  │  │  ├─ 5a97b7e70810349feffc26b909a8aa4bf848c6
│  │  │  └─ 822df928fd70c8b35ca1cb5502d2db8935b2ed
│  │  ├─ c8
│  │  │  ├─ a37b56c03379e1d1150b38d6441e42b456c0c6
│  │  │  ├─ b2459b96d727fddb6e65af8ceea3ac5e942e5d
│  │  │  └─ d6f5f3b4478ca5ae09f78585c4a20999696966
│  │  ├─ c9
│  │  │  └─ 57af1676d393bdcfb3ca8ba5d61e6e36dd9ba0
│  │  ├─ cb
│  │  │  ├─ 3d89cae51d461d1fa784f3efd3c3e55f11047b
│  │  │  ├─ 621522e1c18ec10acd3342bc5b35b051711411
│  │  │  └─ 6fc7c3069fc79f3feed5e1927fb986495b56fe
│  │  ├─ cf
│  │  │  └─ f176e7158c5b8b03e9e843a3135205d571e095
│  │  ├─ d1
│  │  │  ├─ 6bf4659dcd36a98fd8db93b6c634f98e1ca2d2
│  │  │  └─ c4fd0e04dbabefa0d245e22432554497ca35e1
│  │  ├─ d4
│  │  │  ├─ 1fa8ad6b1312989519e6fc498b0e2a60a04aaa
│  │  │  └─ 62cd877fa7e09d2d0e54fd6ea51d00e1b24571
│  │  ├─ d6
│  │  │  └─ 5c117ced45772631ecd6310cf7f1a40aa136b0
│  │  ├─ d7
│  │  │  └─ a1ee8378e4199369f85fadc2d7c22b4c2a43c5
│  │  ├─ d8
│  │  │  ├─ 6eb5b93025f097b8369d10ae8a22eb5cb0eebf
│  │  │  ├─ 8808894c3d9c2ca717209faae479ab9b6790fd
│  │  │  └─ 998387978ca7c47dc64903e68e5948ac07c14f
│  │  ├─ d9
│  │  │  ├─ 121f04d4b6968f88eb1e794ffb0eca180fd506
│  │  │  ├─ 2702cd484d858566273a38c6d0b28c43a510b6
│  │  │  ├─ 9d637c0b9f52bb474853b1fb768ec2db3e784d
│  │  │  ├─ c4dc67cb571f41c872fa01cb640fc69aaa3362
│  │  │  └─ d27ccdedd3e7c3ec09fae615269f452f85b15d
│  │  ├─ da
│  │  │  ├─ 4b84ce840b7775d8a44db46e72f989a6f487e6
│  │  │  └─ d84cba04f665e3ecbe161c6941707679983cd6
│  │  ├─ db
│  │  │  ├─ 05bc424023c97a9bbd4348bbde2695a20a76dc
│  │  │  ├─ 62d56c2f45f06ec10f04963bb54c4e9f419eeb
│  │  │  ├─ 85fe4f97dc03ad1e6f2af156ec5c2477635d38
│  │  │  └─ aa3c0605ca2259fe4c47d592cc9e34f8379f5d
│  │  ├─ e0
│  │  │  └─ 1d4162a061aaec30046d941fb0ae75c2f663fd
│  │  ├─ e1
│  │  │  ├─ 1b31e3740476ecb2a04a00f92b9f0024a2f4f4
│  │  │  └─ 502f184880544c23f8fd078d8de3433ec4f6db
│  │  ├─ e2
│  │  │  └─ 172c07bf16c1b520ac23f916a4dfc8179d844b
│  │  ├─ e6
│  │  │  ├─ 4ccc5a4b8a25184806b069d70c527f588e86e7
│  │  │  └─ 9de29bb2d1d6434b8b29ae775ad8c2e48c5391
│  │  ├─ e7
│  │  │  └─ c20f5d16527c465811d6c203bf7a6e83d8de45
│  │  ├─ e8
│  │  │  └─ 87d1f55c38a2b351cc2d2dcc63b12e5ee01418
│  │  ├─ ea
│  │  │  ├─ 064bcf69ddee39f8e3a388c1701bdb3ef1de0a
│  │  │  ├─ 27eb923b243dd5e9082a184a55997c2266f9cb
│  │  │  ├─ 75d4da415689970d38e04e61175324b14ed6d8
│  │  │  ├─ b0d01383aaf2b70ea048accec6de4def0b18b0
│  │  │  └─ fd748f89448336b6ad1c468342e71cee6f4b64
│  │  ├─ eb
│  │  │  └─ e36d0ffe1247c685f5fc1dc4bfb0374df197ab
│  │  ├─ ee
│  │  │  ├─ 0ade73dbc6c7fcf6c69e87a254f39bac9234ee
│  │  │  ├─ 9453a67ebb845533d119b871336691a3b30ec6
│  │  │  └─ bbbd499a9c9ce43fe4a7d07b11e7b7e0b802b9
│  │  ├─ ef
│  │  │  └─ e2e318fbbe579d07881db03744671adaa9a80b
│  │  ├─ f0
│  │  │  └─ 2c30ef45b2b61c62c03b0c5d22e25471511b54
│  │  ├─ f2
│  │  │  ├─ 385fbb9070aaa16dac3af7737015dc3f41d6d0
│  │  │  ├─ 4c98349e4166dfb8895a2dcd572babfb194c64
│  │  │  └─ 6a137906355b86db01990157a60ae29bf1e7cd
│  │  ├─ f3
│  │  │  ├─ 1656353ddf889da338eb6b16f509234dee96ee
│  │  │  └─ d3797234cbd1661b474fa02c17433ab9f0998d
│  │  ├─ f5
│  │  │  ├─ 56ce33b94a55db21d68bba20abac55ee89027f
│  │  │  └─ fe86bb8e8e1510e3cd82cd12f9834dbc6109cb
│  │  ├─ f7
│  │  │  └─ 0d111b93baf112c4188bd4feb7c1d31fce1d45
│  │  ├─ f9
│  │  │  └─ 53386309f2d5f16055afa1d0a8e9ff397db436
│  │  ├─ fa
│  │  │  ├─ a402cb55311e36d26c03ec6db3807502f171ae
│  │  │  └─ c239f4479fef6cb76d2ee749c39df4f42f2727
│  │  ├─ fb
│  │  │  ├─ 61489ae490ac8aa3569f840ba39b7f725cbcaf
│  │  │  └─ a76a709759834eb01a0428d1e2775bf566ff44
│  │  ├─ fc
│  │  │  └─ 7368a92e7f130d167bc89b387e639b33852e2d
│  │  ├─ fd
│  │  │  ├─ 912a37f02a753f2851b7dbae0bcbe443964321
│  │  │  └─ c9caeaec83dae3d42a02e0450c627895e1feb6
│  │  ├─ fe
│  │  │  └─ ebac7a4350cc55057fae9b48183915e41ac995
│  │  ├─ info
│  │  └─ pack
│  └─ refs
│     ├─ heads
│     │  ├─ develop
│     │  ├─ feature
│     │  │  ├─ error-handler-strategy
│     │  │  ├─ fixing-notion-api
│     │  │  ├─ implementing-web-react-use-websocket
│     │  │  ├─ notion-api
│     │  │  ├─ setting-up-next-fe
│     │  │  ├─ setting-up-next-ui
│     │  │  └─ setting-up-routes
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     ├─ develop
│     │     ├─ feature
│     │     │  ├─ implementing-web-react-use-websocket
│     │     │  ├─ notion-api
│     │     │  ├─ setting-up-next-fe
│     │     │  ├─ setting-up-next-ui
│     │     │  └─ setting-up-routes
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ .vscode
│  └─ settings.json
├─ README.md
├─ config
│  └─ default.json
├─ eslint.config.mjs
├─ myStates.json
├─ next-env.d.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.ts
├─ public
│  └─ styles
│     └─ output.css
├─ src
│  ├─ app
│  │  ├─ components
│  │  │  ├─ CardClimate
│  │  │  │  ├─ index.tsx
│  │  │  │  └─ styles.css
│  │  │  ├─ Chart
│  │  │  │  └─ index.tsx
│  │  │  ├─ PageContentWrapper
│  │  │  │  ├─ index.tsx
│  │  │  │  └─ styles.css
│  │  │  ├─ Sidebar.ts
│  │  │  └─ looties
│  │  │     ├─ airOffIcon.json
│  │  │     └─ cold.json
│  │  ├─ configuration
│  │  │  ├─ ioc.config.ts
│  │  │  ├─ ioc.ts
│  │  │  └─ makeAliases.ts
│  │  ├─ entrypoints
│  │  │  └─ api
│  │  │     ├─ homeassistant
│  │  │     │  ├─ controller.ts
│  │  │     │  └─ index.ts
│  │  │     ├─ notion
│  │  │     │  ├─ controller.ts
│  │  │     │  └─ index.ts
│  │  │     └─ openai
│  │  │        ├─ controller.ts
│  │  │        └─ index.ts
│  │  ├─ gateways
│  │  │  ├─ HAAPI.ts
│  │  │  ├─ NotionAPI.ts
│  │  │  └─ OpenAiAPI.ts
│  │  ├─ haProvider
│  │  │  ├─ WebSocketProvider.tsx
│  │  │  └─ entities
│  │  │     ├─ Climate.ts
│  │  │     ├─ haEvents.ts
│  │  │     └─ index.ts
│  │  ├─ hooks
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ providers.tsx
│  │  ├─ server
│  │  │  ├─ apiRouter.ts
│  │  │  ├─ bootstrap.ts
│  │  │  ├─ index.ts
│  │  │  └─ middlewares
│  │  ├─ services
│  │  │  └─ turnLights.ts
│  │  └─ styles
│  │     ├─ globals.css
│  │     └─ output.css
│  ├─ domain
│  │  ├─ entities
│  │  │  └─ Notion.ts
│  │  ├─ gateways
│  │  │  ├─ HomeAssistantGateway.ts
│  │  │  ├─ NotionGateway.ts
│  │  │  └─ OpenAiGateway.ts
│  │  └─ usecases
│  │     ├─ homeassistant
│  │     │  └─ lights.ts
│  │     ├─ notion-todo
│  │     │  └─ getTodoFromNotion.ts
│  │     └─ openai
│  │        └─ getText.ts
│  └─ output.css
├─ tailwind.config.js
└─ tsconfig.json

```