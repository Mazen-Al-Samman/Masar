import styles from "../../components/styles/form.module.css";
import {useState} from "react";
import {v4 as uuidV4} from "uuid";
import {Col} from "react-bootstrap";


interface Config {
    id: string;
    name: string;
    placeHolder: string;
    label: string;
    onFocus?: Function;
    validation?: string;
    onChange?: Function;
    value?: string;
    usersList: ISingleUser[];
    showUsersList?: boolean
}

export interface ISingleUser {
    id?: number,
    username?: string,
    position?: string
}

const colors = ['#034732', '#009FB7', '#E3D7FF', '#C33149', '#CFE8EF', '#715AFF', '#FE9158', '#1D2D44', '#AEF78E', '#443850'];
const CommentBox = ({id, name, placeHolder, onFocus, value, onChange, usersList}: Config) => {
    const [filtered, setFiltered] = useState([...usersList]);
    const [showList, setShowList] = useState(false);
    const handleChange = (event: any) => {
        const target = event.target;
        const attributeName = event.target.name;
        onFocus && onFocus(attributeName);
        onChange && onChange(name, target.value);
        handleShowMentionList(target?.value);
    }

    const handleShowMentionList = (text: any) => {
        const commentWords = text.split(' ');
        const lastWord = commentWords[commentWords.length - 1];
        if (!lastWord || !lastWord.startsWith('@')) {
            setShowList(false);
            return;
        }

        const searchWord = lastWord.substring(1);
        let filteredUsers = [...usersList];
        if (searchWord.length != 0) filteredUsers = filteredUsers.filter((user) => user?.username?.toLowerCase().includes(searchWord.toLowerCase()));
        setFiltered([...filteredUsers]);
        setShowList(true);
    }

    return (
        <div className="position-relative w-100">
            <div>
                {
                    showList &&
                    <div className={`${styles.list} position-absolute border border`} style={{bottom: '110px'}}>
                        <div className={styles.scroll} style={{maxHeight: '120px'}}>
                            {
                                filtered && filtered.map((item, idx) => {
                                    const matches = item.username?.match(/\b(\w)/g);
                                    const slug = matches?.join('').substring(0, 2).toUpperCase();
                                    return (
                                        <div key={uuidV4()}
                                             className={`${styles.listItem} d-flex justify-content-start gap-3`}>
                                            {
                                                item.id != -1 ?
                                                    <>
                                                        <input type="radio"
                                                               name={name}
                                                               value={item.id}
                                                               id={item.username}/>

                                                        {
                                                            <p
                                                                className={styles.circle}
                                                                style={{backgroundColor: colors[idx % 10]}}>{slug}
                                                            </p>
                                                        }
                                                        <label
                                                            className="noStyle"
                                                            htmlFor={item.username}>
                                                            {item.username}
                                                            <p
                                                                style={{
                                                                    fontSize: '12px',
                                                                    fontWeight: '400',
                                                                    color: '#365158'
                                                                }}
                                                            >
                                                                {item.position}
                                                            </p>
                                                        </label>
                                                    </> :
                                                    <>
                                                        <label>{item.username}</label>
                                                    </>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }

                <textarea className={`${styles.form} p-3`} style={{
                    width: '100%',
                    minHeight: '96px',
                    border: '1px solid #E6E9EA',
                    borderRadius: '8px',
                    resize: 'none',
                }} id={id} value={value}
                          name={name}
                          placeholder={placeHolder}
                          onFocus={(e: any) => {
                              onFocus && onFocus(name)
                          }}

                          onChange={(e: any) => {
                              handleChange(e)
                          }}
                ></textarea>
            </div>
        </div>
    )
}

export default CommentBox;