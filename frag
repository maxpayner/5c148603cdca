{
  "inbounds" : [
    {
      "listen" : "127.0.0.1",
      "port" : 1080,
      "protocol" : "socks",
      "settings" : {
        "auth" : "noauth",
        "udp" : true
      },
      "sniffing" : {
        "destOverride" : [
          "http",
          "tls",
          "quic",
          "fakedns"
        ],
        "enabled" : false,
        "routeOnly" : true
      },
      "tag" : "socks"
    }
  ],
  "outbounds" : [
    {
      "protocol" : "vless",
      "settings" : {
        "vnext" : [
          {
            "address" : "www.zula.ir",
            "port" : 8443,
            "users" : [
              {
                "encryption" : "none",
                "id" : "9127c77e-6f03-4e98-d9ad-13f76dd10a47"
              }
            ]
          }
        ]
      },
      "streamSettings" : {
        "network" : "ws",
        "security" : "tls",
        "sockopt" : {
          "dialerProxy" : "fragment"
        },
        "tlsSettings" : {
          "fingerprint" : "chrome",
          "serverName" : "aiisontheway.shop"
        },
        "wsSettings" : {
          "headers" : {
            "Host" : "aiisontheway.shop"
          },
          "path" : "\/holypathfrag"
        }
      },
      "tag" : "proxy"
    },
    {
      "protocol" : "freedom",
      "settings" : {
        "fragment" : {
          "interval" : "15-20",
          "length" : "10-20",
          "packets" : "tlshello"
        }
      },
      "streamSettings" : {
        "sockopt" : {
          "tcpNoDelay" : true
        }
      },
      "tag" : "fragment"
    },
    {
      "protocol" : "freedom",
      "tag" : "direct"
    },
    {
      "protocol" : "blackhole",
      "tag" : "block"
    }
  ]
}
