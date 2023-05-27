#
# Copyright (C) 2008-2014 The LuCI Team <luci@lists.subsignal.org>
#
# This is free software, licensed under the Apache License, Version 2.0 .
#

include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-argon-config
LUCI_PKGARCH:=all
PKG_VERSION:=0.9
PKG_RELEASE:=20210309

include $(INCLUDE_DIR)/package.mk

define Package/luci-app-argon-config
 	SECTION:=luci
	CATEGORY:=LuCI
	SUBMENU:=3. Applications
	TITLE:=LuCI page for Argon Config
	PKGARCH:=all
	DEPENDS:=+luci-compat
endef

$(eval $(call BuildPackage,luci-app-argon-config))

# call BuildPackage - OpenWrt buildroot signature
