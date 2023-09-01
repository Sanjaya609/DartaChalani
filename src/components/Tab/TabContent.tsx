import { TabContent as RTabContent, TabContentProps } from 'reactstrap';

function TabContent(props: TabContentProps) {
  return <RTabContent {...props} className="app-height position-relative" />;
}
export default TabContent;
