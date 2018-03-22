import React from "react";
import PropTypes from "prop-types";
import { Form, Row, Col, Input, Button } from "antd";
const FormItem = Form.Item;

class AdvancedSearchForm extends React.Component {
  static propTypes = {
    form: PropTypes.object,
  };

  state = {
    expand: false,
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log("Received values of form: ", values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  toggle = () => {
    this.setState({ expand: !this.state.expand });
  };

  // To generate mock Form.Item
  getFields() {
    const count = this.state.expand ? 10 : 6;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? "block" : "none" }}>
          <FormItem label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`)(
              <Input placeholder="placeholder" />,
            )}
          </FormItem>
        </Col>,
      );
    }
    return children;
  }

  render() {
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={10}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              Clear
            </Button>
            <Button
              icon={this.state.expand ? "up" : "down"}
              onClick={this.toggle}
            >
              {this.state.expand ? "收起" : "展开"}
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

// const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
export default Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    console.log(props);
    return {
      "field-9": Form.createFormField({
        ...props.values,
        value: props.values.value,
      }),
    };
  },
})(AdvancedSearchForm);