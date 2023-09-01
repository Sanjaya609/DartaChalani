import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from 'reactstrap';

interface IPropsTableFilter {
  searchKey: string;
  setSearchKey: (data: string) => void;
  isFilter?: boolean;
  isSearch?: boolean;
  isOrdering?: boolean;
  isAddAndRedirectTo?: {
    title: string;
    onClick: () => void;
    btnClass?: string;
  };
  filterButtonClickAction?: () => void;
  TableFilterComponent?: React.ComponentType;
  // for privilege
}

function TableFilter(props: IPropsTableFilter) {
  // const [startDate, setStartDate] = React.useState(new Date());
  const {
    searchKey,
    setSearchKey,
    isSearch,
    isOrdering,
    isAddAndRedirectTo,
    isFilter,
    filterButtonClickAction,
    TableFilterComponent
  } = props;
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  React.useEffect(() => {
    if (searchKey) {
      setSearchKey(searchKey);
    }
  }, [searchKey]);

  return (
    <div className="w-100 p-3">
      <div className="table-header">
        <div className="align-vertical justify-content-between w-100 ">
          {isOrdering && (
            <div className="align-vertical mr-3">
              <i className="ic-sort-arrow text-gray-80 mr-2"></i>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle tag="div" className="dropdown-text" caret>
                  Sort
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Ascending</DropdownItem>
                  <DropdownItem>Descending</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}

          {isSearch && (
            <div className="form-control-icon rft flex-grow-1 ">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <i className="ic-search"></i>
            </div>
          )}

          {filterButtonClickAction && (
            <UncontrolledDropdown onClick={filterButtonClickAction}>
              <DropdownToggle className="btn-filter btn-outline-gray-16 ml-3">
                <i className="ic-filter mr-2"></i> <span> Filter By</span>{' '}
                <i className="ic-arrow-down"></i>
              </DropdownToggle>
            </UncontrolledDropdown>
          )}

          {isFilter && (
            <UncontrolledDropdown>
              <DropdownToggle className="btn-filter btn-outline-gray-16 ml-3">
                <i className="ic-filter mr-2"></i> <span> Filter By</span>{' '}
                <i className="ic-arrow-down"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-filter" end>
                {TableFilterComponent && <TableFilterComponent />}
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
          {isAddAndRedirectTo && (
            <button
              className={`btn btn-${isAddAndRedirectTo.btnClass || 'success'} btn-icon lft ml-3`}
              onClick={isAddAndRedirectTo.onClick}>
              <i className="ic-add"></i>
              {isAddAndRedirectTo.title}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TableFilter;
