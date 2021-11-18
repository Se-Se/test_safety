import intl from "react-intl-universal";
export function packageColums(renderOperationColumn) {
  let arr = [
    { key: "no", header: intl.get("MANAGE_PACKAGE_COLUMS_H_1"), width: 80 },
    {
      key: "name",
      header: intl.get("MANAGE_PACKAGE_COLUMS_H_2"),
      width: "auto",
    },
    {
      key: "describe",
      header: intl.get("MANAGE_PACKAGE_COLUMS_H_3"),
      width: "auto",
    },
    {
      key: "platid",
      header: intl.get("MANAGE_PACKAGE_COLUMS_H_4"),
      width: "auto",
    },
    {
      key: "connect",
      header: intl.get("MANAGE_PACKAGE_COLUMS_H_5"),
      width: "auto",
    },
    {
      key: "creater",
      header: intl.get("MANAGE_PACKAGE_COLUMS_H_6"),
      width: 200,
    },
    {
      key: "editTime",
      header: intl.get("MANAGE_PACKAGE_COLUMS_H_7"),
      width: "auto",
    },
    {
      key: "setting",
      header: intl.get("MANAGE_PACKAGE_COLUMS_H_8"),
      width: "auto",
      render: (cvm) => {
        return renderOperationColumn(cvm);
      },
    },
  ];
  return arr;
}

export function upfileList(renderOperationColumn) {
  let arr = [
    { key: "check", header: intl.get("MANAGE_UP_FILE_COLUMNS_H_1"), width: 80 },
    {
      key: "fileName",
      header: intl.get("MANAGE_UP_FILE_COLUMNS_H_2"),
      width: "auto",
    },
    {
      key: "fileType",
      header: intl.get("MANAGE_UP_FILE_COLUMNS_H_3"),
      width: "auto",
    },
    {
      key: "createTime",
      header: intl.get("MANAGE_UP_FILE_COLUMNS_H_4"),
      width: "auto",
    },
    {
      key: "creater",
      header: intl.get("MANAGE_UP_FILE_COLUMNS_H_5"),
      width: "auto",
    },
    {
      key: "setting",
      header: intl.get("MANAGE_UP_FILE_COLUMNS_H_6"),
      width: "auto",
      render: (cvm) => {
        return renderOperationColumn(cvm);
      },
    },
  ];
  return arr;
}
export function packageResourceColums(renderOperationColumn, renderdocList) {
  let arr = [
    {
      key: "no",
      header: intl.get("MANAGE_PACKAGE_SOURCE_COLUMNS_H_1"),
      width: 80,
    },
    {
      key: "packName",
      header: intl.get("MANAGE_PACKAGE_SOURCE_COLUMNS_H_2"),
      width: "auto",
    },
    {
      key: "fileName",
      header: intl.get("MANAGE_PACKAGE_SOURCE_COLUMNS_H_3"),
      width: "auto",
    },
    {
      key: "platid",
      header: intl.get("MANAGE_PACKAGE_SOURCE_COLUMNS_H_4"),
      width: "auto",
    },
    {
      key: "editTime",
      header: intl.get("MANAGE_PACKAGE_SOURCE_COLUMNS_H_5"),
      width: "auto",
    },
    {
      key: "sourecList",
      header: intl.get("MANAGE_PACKAGE_SOURCE_COLUMNS_H_6"),
      width: 200,
      render: (cvm) => {
        return renderdocList(cvm);
      },
    },
    {
      key: "setting",
      header: intl.get("MANAGE_PACKAGE_SOURCE_COLUMNS_H_7"),
      width: "auto",
      render: (cvm) => {
        return renderOperationColumn(cvm);
      },
    },
  ];
  return arr;
}

export function resourceDownloadColums(renderInnerNet, renderOutNet) {
  let arr = [
    {
      key: "id",
      header: intl.get("MANAGE_SOURCE_DEL_COLUMNS_H_1"),
      width: 100,
      align: "center",
    },
    {
      key: "name",
      header: intl.get("MANAGE_SOURCE_DEL_COLUMNS_H_2"),
      width: "auto",
      align: "center",
    },

    {
      key: "innerNet",
      header: intl.get("MANAGE_SOURCE_DEL_COLUMNS_H_3"),
      width: 150,
      align: "center",
      render: (cvm) => {
        return renderInnerNet(cvm);
      },
    },
    {
      key: "outNet",
      header: intl.get("MANAGE_SOURCE_DEL_COLUMNS_H_4"),
      width: 150,
      align: "center",
      render: (cvm) => {
        return renderOutNet(cvm);
      },
    },
  ];
  return arr;
}

export function SDKColumns(renderSetting) {
  let arr = [
    { key: "no", header: intl.get("MANAGE_SDK_COLUMNS_H_1"), width: 80 },
    {
      key: "SDKName",
      header: intl.get("MANAGE_SDK_COLUMNS_H_2"),
      width: "auto",
    },
    {
      key: "platid",
      header: intl.get("MANAGE_SDK_COLUMNS_H_3"),
      width: "auto",
    },
    {
      key: "createTiem",
      header: intl.get("MANAGE_SDK_COLUMNS_H_4"),
      width: "auto",
    },

    {
      key: "setting",
      header: intl.get("MANAGE_SDK_COLUMNS_H_5"),
      width: "auto",
      render: (cvm) => {
        return renderSetting(cvm);
      },
    },
  ];
  return arr;
}

export function GameColumns(renderSetting) {
  let arr = [
    { key: "no", header: intl.get("MANAGE_GAME_COLUMNS_H_1"), width: 80 },
    {
      key: "gameName",
      header: intl.get("MANAGE_GAME_COLUMNS_H_2"),
      width: "auto",
    },
    {
      key: "platid",
      header: intl.get("MANAGE_GAME_COLUMNS_H_3"),
      width: "auto",
    },
    {
      key: "createTiem",
      header: intl.get("MANAGE_GAME_COLUMNS_H_4"),
      width: "auto",
    },

    {
      key: "setting",
      header: intl.get("MANAGE_GAME_COLUMNS_H_5"),
      width: "auto",
      render: (cvm) => {
        return renderSetting(cvm);
      },
    },
  ];
  return arr;
}
