<div align="center">
  <img src="https://raw.githubusercontent.com/jerrykuku/staff/master/argon_title2.png"  >
  <h1 align="center">
    A new LuCI theme for OpenWrt
  </h1>
    <h3 align="center">
    Argon is a clean HTML5 theme for LuCI. Users may<br>setup their own favorite logins, including beautiful<br>pics and customized mp4 videos.<br><br>
  </h3>
</div>
<br>
<div align="center">
  <img src="https://raw.githubusercontent.com/jerrykuku/staff/master/argon2.gif">
</div>

## Notice 
It is strongly recommended to use the Chrome browser. Some new css3 features are used in the theme, and currently only Chrome has the best compatibility.
The mainline version of IE series currently has bugs to be resolved.
FireFox does not enable the backdrop-filter by default, see here for the opening method: https://developer.mozilla.org/zh-CN/docs/Web/CSS/backdrop-filter

## How to build

Enter in your openwrt/package/ or other

### Openwrt official SnapShots

```shell
cd openwrt
git clone https://github.com/sbwml/luci-theme-argon package/luci-theme-argon --depth=1
make menuconfig # choose LUCI->Theme->Luci-theme-argon
make -j1 V=s
```
