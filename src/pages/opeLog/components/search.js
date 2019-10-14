import React from "react";
import { Form, Select, DatePicker, Button, Radio } from "antd";
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = "YYYY/MM/DD";
import moment from "moment";
const Search = ({ form }) => {
  const { getFieldDecorator } = form;
  return (
    <Form className="form">
      <FormItem className="formItem">
        {getFieldDecorator("date", {
          initialValue: 1
        })(
          <Radio.Group buttonStyle="solid">
            <Radio.Button value={1}>今天</Radio.Button>
            <Radio.Button value={2}>昨天</Radio.Button>
            <Radio.Button value={3}>本周</Radio.Button>
          </Radio.Group>
        )}
      </FormItem>
      <FormItem label="用户" className="formItem">
        {getFieldDecorator("name")(
          <Select style={{ width: "10rem" }} placeholder="选择用户">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </Select>
        )}
      </FormItem>
      <FormItem label="选择时间" className="formItem">
        {getFieldDecorator("time")(
          <RangePicker
            defaultValue={[
              moment("2015/01/01", dateFormat),
              moment("2015/01/01", dateFormat)
            ]}
            format={dateFormat}
          />
        )}
      </FormItem>
      <Button className="antBtn searchBtn" type="primary">
        搜索
      </Button>
    </Form>
  );
};
export default Form.create({})(Search);
