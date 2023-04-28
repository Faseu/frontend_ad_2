import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';

const DemoPage: React.FC = () => {
  return (
    <PageContainer ghost>
      <div className={styles.container}>全屏显示</div>
    </PageContainer>
  );
};

export default DemoPage;
