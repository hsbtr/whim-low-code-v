import { CardSharp, GameController, StatsChartOutline } from '@vicons/ionicons5';

export * from './Line/Line.vue';
// export * from './Bar';
// export * from './List';
// export * from './Frame';

import { vIonIcons } from '@/components/Icons';
import type { LineMeta, LineMetaProps } from './Line/meta';
import type { BarMeta, BarMetaProps } from './Bar/meta';
import type { ListMeta, ListMetaProps } from './List/meta';
import type { FrameMeta, FrameMetaProps } from './Frame/meta';
import type { DefineComponent } from 'vue';

type NotesType = LineMeta | BarMeta | ListMeta | FrameMeta;
type SeriesType = NotesType['belong'];
type GroupType = Omit<NotesType, 'props'> & { key: NotesType['type'] };
type NodeType = LineMetaProps | BarMetaProps | ListMetaProps | FrameMetaProps;
type PkgsValue= { group: GroupType[], nodes: NodeType[] };
type Pkgs = {
  [K in SeriesType]?: PkgsValue
}

const materialNotes: Record<string, { default: NotesType }> = import.meta.glob('./*/meta.ts', { eager: true });

const packages: Pkgs = {};
Object.keys(materialNotes).forEach((key) => {
  const { props, ...meta } = materialNotes[key].default;
  if (packages[meta.belong]) {
    const groupItem = { ...meta, key: meta.type };
    const pkg = packages[meta.belong] as PkgsValue;
    packages[meta.belong] = {
      group: [...pkg.group, groupItem],
      nodes: [...pkg.nodes, ...props],
    };
  } else {
    packages[meta.belong] = {
      group: [{ title: '全部', key: 'all', type: 'all', belong: meta.belong }, { ...meta, key: meta.type }],
      nodes: [...props]
    };
  }
});

const materialSeries = [
  {
    title: '图表',
    series: 'chart',
    icon: StatsChartOutline,
  },
  {
    title: '信息',
    series: 'view',
    icon: CardSharp,
  },
  {
    title: '控件',
    series: 'control',
    icon: GameController,
  },
];

export const createMaterialOptions = () => {
  console.log(materialNotes);
  const series = materialSeries.map(({ series, title, icon }) => {

    return {
      label: title,
      key: series,
      icon: vIonIcons(icon as DefineComponent)
    };
  });
  return {
    packages,
    series
  };
};
