/// <reference types="vite/client" />
import type { DialogApiInjection } from 'naive-ui/es/dialog/src/DialogProvider';
import type { LoadingBarApiInjection } from 'naive-ui/es/loading-bar/src/LoadingBarProvider';
import type { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider';
import type { NotificationApiInjection } from 'naive-ui/es/notification/src/NotificationProvider';
import type { Component } from 'vue';

interface ImportMetaEnv {
  // 标题
  VITE_GLOB_APP_TITLE: string;
  // 端口
  VITE_DEV_PORT: string;
  // 开发地址
  VITE_DEV_PATH: string;
  // 生产地址
  VITE_PRO_PATH: string;
  VITE_APP_HTTP_PREFIX: string;
}

declare global {
  interface Window {
    $loading: LoadingBarApiInjection;
    $message: MessageApiInjection;
    $dialog: DialogApiInjection;
    $notification: NotificationApiInjection;
    // 语言
    $t: any;
    $vue: any;
    // 键盘按键记录
    $KeyboardActive?: { [T: string]: boolean };
    onKeySpacePressHold?: Function;

    // 编辑 JSON 的存储对象
    opener: any
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    icon?: Component;
    // 隐藏当前菜单及子菜单
    hideInMenu?: boolean;
    hideInBread?: boolean;
    access?: string;
  }
}
