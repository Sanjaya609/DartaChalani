import { TabPane as RTabPane, TabPaneProps } from 'reactstrap';

function TabPane(props: TabPaneProps) {
  return <RTabPane {...props} className="app-absolute-layout" />;
}
export default TabPane;
