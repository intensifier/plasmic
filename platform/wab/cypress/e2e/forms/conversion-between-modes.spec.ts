import {
  deleteDataSourceOfCurrentTest,
  ExpectedFormItem,
  removeCurrentProject,
} from "../../support/util";

describe("conversion-between-modes", function () {
  beforeEach(() => {
    cy.createFakeDataSource().then(() => {
      cy.setupProjectFromTemplate("forms", {
        dataSourceReplacement: {
          fakeSourceId: Cypress.env("dataSourceId"),
        },
        devFlags: {
          schemaDrivenForms: true,
          simplifiedForms: true,
        },
      });
    });
  });

  afterEach(() => {
    deleteDataSourceOfCurrentTest();
    removeCurrentProject();
  });

  it("simplied <-> advanced mode", function () {
    cy.withinStudioIframe(() => {
      cy.switchArena("Test Conversion 1").then((framed) => {
        const expectedFormItems: ExpectedFormItem[] = [
          {
            name: "textItem",
            label: "Text Item",
            type: "Text",
            value: "text value",
          },
          {
            name: "textAreaItem",
            label: "Text Area Item",
            type: "Text Area",
            value: "text area value",
          },
          {
            name: "passwordItem",
            label: "Password Item",
            type: "Password",
            value: "password value",
          },
          {
            name: "numberItem",
            label: "Number Item",
            type: "Number",
            value: 123,
          },
          {
            name: "selectItem",
            label: "Select Item",
            type: "Select",
            value: "Option 1",
          },
          {
            name: "radioGroupItem",
            label: "Radio Group Item",
            type: "Radio Group",
            value: "radio1",
          },
          {
            name: "checkboxItem",
            label: "Checkbox Item",
            type: "Checkbox",
            value: true,
          },
          {
            name: "datePickerItem",
            label: "Date Picker Item",
            type: "DatePicker",
            value: "2023-09-21T13:00:00.000Z",
          },
          { name: "requiredItem", label: "Required Item", type: "Text" },
          { name: "rangeLength", label: "Range Length", type: "Text" },
          { name: "rangeValue", label: "Range Value", type: "Number" },
        ];

        cy.checkFormValuesInCanvas(expectedFormItems, framed);
        cy.selectTreeNode(["root", "Form"]);
        cy.clickDataPlasmicProp("simplified-mode-toggle");
        cy.checkFormValuesInCanvas(expectedFormItems, framed);
        cy.clickDataPlasmicProp("simplified-mode-toggle");
        cy.checkFormValuesInCanvas(expectedFormItems, framed);
      });
    });
  });

  it("advanced <-> simplified mode", function () {
    cy.withinStudioIframe(() => {
      cy.switchArena("Test Conversion 2").then((framed) => {
        const expectedFormItems: ExpectedFormItem[] = [
          {
            name: "textItem",
            label: "Text Item",
            type: "Text",
            value: "text value",
          },
          {
            name: "textAreaItem",
            label: "Text Area Item",
            type: "Text Area",
            value: "text area value",
          },
          {
            name: "passwordItem",
            label: "Password Item",
            type: "Password",
            value: "password value",
          },
          {
            name: "numberItem",
            label: "Number Item",
            type: "Number",
            value: 123,
          },
          {
            name: "selectItem",
            label: "Select Item",
            type: "Select",
            value: "Option 1",
          },
          {
            name: "radioGroupItem",
            label: "Radio Group Item",
            type: "Radio Group",
            value: "radio1",
          },
          {
            name: "checkboxItem",
            label: "Checkbox Item",
            type: "Checkbox",
            value: true,
          },
          {
            name: "datePickerItem",
            label: "Date Picker Item",
            type: "DatePicker",
            value: "2023-09-21T13:00:00.000Z",
          },
          { name: "requiredItem", label: "Required Item", type: "Text" },
          { name: "rangeLength", label: "Range Length", type: "Text" },
          { name: "rangeValue", label: "Range Value", type: "Number" },
        ];

        cy.checkFormValuesInCanvas(expectedFormItems, framed);
        cy.selectTreeNode(["root", "Form"]);
        cy.clickDataPlasmicProp("simplified-mode-toggle");
        cy.checkFormValuesInCanvas(expectedFormItems, framed);
        cy.clickDataPlasmicProp("simplified-mode-toggle");
        cy.checkFormValuesInCanvas(expectedFormItems, framed);
      });
    });
  });

  it("schema mode: new entry", function () {
    cy.withinStudioIframe(() => {
      cy.switchArena("Test Conversion 3").then((framed) => {
        const expectedFormItems: ExpectedFormItem[] = [
          { name: "id", label: "id", type: "Number" },
          { name: "firstName", label: "firstName", type: "Text" },
          { name: "lastName", label: "lastName", type: "Text" },
          { name: "sport", label: "sport", type: "Text" },
          { name: "age", label: "age", type: "Number" },
        ];

        cy.selectTreeNode(["root", "Form"]);
        cy.checkFormValuesInCanvas(expectedFormItems, framed);
        cy.clickDataPlasmicProp("simplified-mode-toggle");
        cy.checkFormValuesInCanvas(expectedFormItems, framed);
        cy.clickDataPlasmicProp("simplified-mode-toggle");
        cy.checkFormValuesInCanvas(expectedFormItems, framed);
      });
    });
  });

  it("schema mode: update entry", function () {
    cy.withinStudioIframe(() => {
      cy.switchArena("Test Conversion 4").then((framed) => {
        const expectedFormItems: ExpectedFormItem[] = [
          { name: "id", label: "id", type: "Number", value: 1 },
          { name: "name", label: "name", type: "Text" },
          { name: "price", label: "price", type: "Number", value: 2 },
        ];

        cy.selectTreeNode(["root", "Form"]);
        cy.checkFormValuesInCanvas(expectedFormItems, framed);
        cy.clickDataPlasmicProp("simplified-mode-toggle");
        cy.checkFormValuesInCanvas(expectedFormItems, framed);
        cy.clickDataPlasmicProp("simplified-mode-toggle");
        cy.checkFormValuesInCanvas(expectedFormItems, framed);
      });
    });
  });

  it("conversion keeps dynamic values", function () {
    cy.withinStudioIframe(() => {
      cy.switchArena("Test Conversion 5").then((framed) => {
        const expectedFormItems: ExpectedFormItem[] = [
          { name: "id", label: "id", type: "Number" },
          {
            name: "firstName",
            label: "First Name",
            type: "Text",
            value: "Hello",
          },
          {
            name: "Last name",
            label: "lastName",
            type: "Text",
            value: "World",
          },
          { name: "sport", label: "sport", type: "Text" },
          { name: "age", label: "age", type: "Number" },
          { name: "active", label: "Active", type: "Checkbox", value: true },
        ];

        cy.selectTreeNode(["root", "Form"]);
        cy.checkFormValuesInCanvas(expectedFormItems, framed);
        cy.clickDataPlasmicProp("simplified-mode-toggle");
        cy.checkFormValuesInCanvas(expectedFormItems, framed);
        cy.clickDataPlasmicProp("simplified-mode-toggle");
        cy.checkFormValuesInCanvas(expectedFormItems, framed);
      });
    });
  });

  it("should miss some information when converting to simplified mode", function () {
    cy.withinStudioIframe(() => {
      cy.switchArena("Test Conversion 6").then((framed) => {
        const expectedFormItems: ExpectedFormItem[] = [
          {
            name: "textItem",
            label: "Text Item",
            type: "Text",
            value: "text value",
          },
          {
            name: "textAreaItem",
            label: "Text Area Item",
            type: "Text Area",
            value: "text area value",
          },
          {
            name: "passwordItem",
            label: "Password Item",
            type: "Password",
            value: "password value",
          },
          {
            name: "numberItem",
            label: "Number Item",
            type: "Number",
            value: 123,
          },
          {
            name: "selectItem",
            label: "Select Item",
            type: "Select",
            value: "Option 1",
          },
          {
            name: "radioGroupItem",
            label: "Radio Group Item",
            type: "Radio Group",
            value: "radio1",
          },
          {
            name: "checkboxItem",
            label: "Checkbox Item",
            type: "Checkbox",
            value: true,
          },
          {
            name: "datePickerItem",
            label: "Date Picker Item",
            type: "DatePicker",
            value: "2023-09-21T13:00:00.000Z",
          },
          { name: "requiredItem", label: "Required Item", type: "Text" },
          { name: "rangeLength", label: "Range Length", type: "Text" },
          { name: "rangeValue", label: "Range Value", type: "Number" },
        ];

        cy.selectTreeNode(["root", "Form"]);
        cy.checkFormValuesInCanvas(expectedFormItems, framed);
        cy.clickDataPlasmicProp("simplified-mode-toggle");
        cy.checkFormValuesInCanvas(expectedFormItems, framed);
        cy.clickDataPlasmicProp("simplified-mode-toggle");
        cy.checkFormValuesInCanvas(expectedFormItems, framed);
      });
    });

    it("convert plume components", function () {
      cy.withinStudioIframe(() => {
        cy.switchArena("Test Conversion 7").then((framed) => {
          const expectedFormItems: ExpectedFormItem[] = [
            { name: "plumeText", label: "Plume Text Input", type: "Text" },
            {
              name: "plumeSelect",
              label: "Plume select",
              type: "Select",
              value: "option1",
            },
            {
              name: "plumeSelectUsingSlot",
              label: "Plume select using slot",
              type: "Select",
              value: "Option 3 0",
            },
            {
              name: "plumeCheckbox",
              label: "Checkbox label",
              type: "Checkbox",
              value: true,
            },
            {
              name: "plumeSwitch",
              label: "Switch me",
              type: "Checkbox",
              value: true,
            },
          ];

          cy.selectTreeNode(["root", "Form"]);
          cy.checkFormValuesInCanvas(expectedFormItems, framed);
          cy.clickDataPlasmicProp("simplified-mode-toggle");
          cy.checkFormValuesInCanvas(expectedFormItems, framed);
          cy.clickDataPlasmicProp("simplified-mode-toggle");
          cy.checkFormValuesInCanvas(expectedFormItems, framed);
        });
      });
    });
  });
});
