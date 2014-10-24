package mpmedia.observer;

import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Observable;

public class ObservableCollection<T> extends Observable implements IObservableCollection<T>{
    
    private final T type;
    private List<T> items;
    
    public ObservableCollection(T type,List<T> items){
        this.type = type;
        this.items = items;
        
    }
    
    @Override
    public List<T> getItems(){
        return items;
    }
    
    @Override
    public void setItems(List<T> items){
        this.items = items;
        this.notifyObservers();
    }

    @Override
    public int size() {
        return this.items.size();
    }

    @Override
    public boolean isEmpty() {
        return this.items.isEmpty();
    }

    @Override
    public boolean contains(Object o) {
        return this.items.contains(o);
    }

    @Override
    public Iterator iterator() {
        return this.items.iterator();
    }

    @Override
    public Object[] toArray() {
        return this.items.toArray();
    }

    @Override
    public Object[] toArray(Object[] a) {
        return this.items.toArray(a);
    }

    @Override
    public boolean add(T e) {
        boolean result ;
        result = this.items.add(e);
        this.notifyObservers();
        return result;
        
    }

    @Override
    public boolean remove(Object o) {
        boolean result;
        result = this.items.remove((T)o);
        this.notifyObservers();
        return result;
    }


    @Override
    public void clear() {
        this.items.clear();
        this.notifyObservers();
    }

    @Override
    public T get(int index) {
       return this.items.get(index);
    }

    @Override
    public T set(int index, T element) {
        T o= this.items.set(index, element);
        this.notifyObservers();
        return o;
    }

    @Override
    public void add(int index, T element) {
        this.items.add(index, element);
        this.notifyObservers();
    }

    @Override
    public T remove(int index) {
        T o = this.items.remove(index);
        this.notifyObservers();
        return o;
    }

    @Override
    public int indexOf(Object o) {
        return this.items.indexOf(o);
    }

    @Override
    public int lastIndexOf(Object o) {
       return this.items.lastIndexOf(o);
    }

    @Override
    public ListIterator listIterator() {
       return this.items.listIterator();
    }

    @Override
    public ListIterator listIterator(int index) {
        return this.items.listIterator(index);
    }

    @Override
    public List<T> subList(int fromIndex, int toIndex) {
       return this.items.subList(fromIndex, toIndex);
    }

    @Override
    public boolean containsAll(java.util.Collection c) {
        return this.items.containsAll(c);
    }

    @Override
    public boolean addAll(java.util.Collection c) {
       return this.items.addAll(c);
    }

    @Override
    public boolean addAll(int index, java.util.Collection c) {
        return this.items.addAll(index, c);
    }

    @Override
    public boolean removeAll(java.util.Collection c) {
        return this.items.removeAll(c);
    }

    @Override
    public boolean retainAll(java.util.Collection c) {
        return this.items.retainAll(c);
    }
    


    
}

