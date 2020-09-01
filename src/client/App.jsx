import React,{Component} from 'react'
export default class App extends Component {
    constructor(){
        super();
        this.state={
            title: '',
            description: '',
            _id: '',
            tasks: []
        }
        this.addTask = this.addTask.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount(){
        this.getTasks()
    }
    getTasks(){
        fetch('http://localhost:3000/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data})
            })
            .catch(err => console.error(err))
    }

    addTask(e){
        e.preventDefault()
        if(this.state._id){
            fetch(`http://localhost:3000/api/tasks/${this.state._id}`,{
                method: 'PUT',
                body: JSON.stringify({
                    title: this.state.title,
                    description: this.state.description
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html:data.status})
                this.setState({
                    title: '',
                    description: '',
                    _id: ''
                })
                this.getTasks()
            })
        }else{
            const {title,description} = this.state
            fetch('http://localhost:3000/api/tasks',{
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: data.status})
                this.setState({title: '', description: ''})
                this.getTasks()
            })
            .catch(err => console.error(err))
        }
        
    }

    handleChange(e){
        e.preventDefault()
        const {name, value} = e.target
        this.setState({
            [name] : value
        })
    }

    editTask(id){
        fetch(`http://localhost:3000/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                _id:data._id,
                title: data.title,
                description: data.description
            })
        })
        .catch(err => console.log(err))
    }

    deleteTask(id){
        if(confirm(`¿Estas Seguro de borrar la tarea?`))
        fetch(`http://localhost:3000/api/tasks/${id}`,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then (res => res.json())
        .then(data => {
            M.toast({html: data.status})
            this.getTasks()
        })
    }
    render(){
        return(
            <div>
                <nav className='light-blue darken-4'>
                    <div className='container'>
                        <a href="/" className='brand-logo'>MERN STACK</a>
                    </div>
                </nav>
                <div className='row container'>
                    <div className="col s5 m6">
                        <div className="card">
                            <div className="card-content"> 
                                <form onSubmit={this.addTask}>
                                    <div className='row'>
                                        <div className='input-field col s12'>
                                            <input name='title' type="text" onChange={this.handleChange} value={this.state.title} placeholder='Nombre de la Tarea'/>
                                        </div>
                                        <div className='input-field col s12'>
                                            <textarea name='description' className='materialize-textarea' onChange={this.handleChange} value={this.state.description} placeholder='Detalles de la tarea'></textarea>
                                        </div>
                                        <button type='submit' className='btn light-blue darken-4'>Enviar</button>
                                    </div>
                                </form>     
                            </div>
                        </div>
                    </div>
                    <div className="col s7 m6">
                        <table>
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Descripcion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.tasks.map(task => {
                                        return(
                                            <tr key={task._id}>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td>
                                                    <button className='btn light-blue darken-4' onClick={(() =>this.editTask(task._id))}> <i className="material-icons">edit</i> </button>
                                                </td>
                                                <td>
                                                    <button className='btn light-blue darken-4' onClick={(() =>this.deleteTask(task._id))}> <i className="material-icons">delete</i> </button>
                                                </td>                                      
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}